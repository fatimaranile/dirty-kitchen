import re

fileName = input("Enter file:")
if len(fileName) < 1 : fileName = "regex_sum_178.txt"

try:
    fileHandle = open(fileName)
except:
    print('Enter an existing file')
total = 0
values = 0

for line in fileHandle:
    line = line.rstrip()
    if re.search('[0-9]+', line):
        result = re.findall('([0-9]+)+', line)
        for eachResult in result:
            values += 1
            total += int(eachResult)
print('There are %d values with a sum=%d'%(values ,total))