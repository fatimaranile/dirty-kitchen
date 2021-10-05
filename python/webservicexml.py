import urllib.request
import xml.etree.ElementTree as ET
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

sum = 0

while True:
    address = input('Enter location: ')
    if len(address) < 1 : address = 'http://py4e-data.dr-chuck.net/comments_182.xml'
    
    print('Retrieving', address)
    fetchData = urllib.request.urlopen(address, context=ctx)

    data = fetchData.read()
    print('Retrieved', len(data), 'characters')
    tree = ET.fromstring(data)

    nodeList = tree.findall('comments/comment')
    print('Count:', len(nodeList))

    for node in nodeList:
        sum += int(node.find('count').text)
    break;
print('Sum=%d' %(sum))