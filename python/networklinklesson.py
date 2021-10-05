import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    urlToOpen = input('Enter URL: ')
    if len(urlToOpen) < 1 : urlToOpen = "http://py4e-data.dr-chuck.net/known_by_Brandonlee.html"
except:
    print('Enter a valid URL');
    exit()

try:
    countString = input('Enter count: ')
    positionString = input('Enter position: ')

    count = int(countString);
    position = int(positionString);
except:
    print('Enter valid position/count');
    exit()

while count >= 0:
    print('Retrieving:', urlToOpen)
    html = urllib.request.urlopen(urlToOpen, context=ctx).read()
    soup = BeautifulSoup(html, 'html.parser')
    tags = soup('a');
    
    currentTag = tags[position-1]
    urlToOpen = currentTag.get('href', None)
    count -= 1