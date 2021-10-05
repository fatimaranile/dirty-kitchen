import urllib.request
import xml.etree.ElementTree as ET
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

sum=0

while True:
    address = input('Enter location: ')
    if len(address) < 1 : address = 'http://py4e-data.dr-chuck.net/comments_184.json'
    
    print('Retrieving', address)
    url = urllib.request.urlopen(address, context=ctx)

    data = url.read().decode()
    print('Retrieved', len(data), 'characters')

    info = json.loads(data)
    comments = info['comments']
    print('Count:', len(comments))

    for comment in comments:
        sum += int(comment['count'])
    break
print('Sum=%s' %(sum))