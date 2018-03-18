from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def hello(request):
    resp = [{'errorcode': '100', 'detail': 'Get success'}]
    li = ['l1','l2','l333']
    print("hello")
    return HttpResponse(json.dumps(li), content_type="application/json")
    return HttpResponse(json.dumps(resp), content_type="application/json")

def pack_ddls():
    f = open('./helloworld/datas/ddls.txt','r')
    l = f.readlines()
    f.close()
    res = []
    for i in range(len(l)):
        l[i] = l[i].split()
        item = {'n1':l[i][1],'id':l[i][0],'ddl':l[i][2],'content':l[i][3]}
        res.append(item)
    print(l)
    return res

def hello2(req):
    resp = [{'n1':'软工导'},{'n1':'web'},{'n1':'ics'}]
    resp = pack_ddls()
    return HttpResponse(json.dumps(resp),content_type="application/json")

@csrf_exempt
def newblock(req):
    resp=[{'stat':'ok'}]
    print("newnewnew")
    r = req.read()
    print(r,type(r))
    print(r.decode(),type(r.decode()))
    rd = r.decode()
    print(json.loads(rd),type(json.loads(rd)))
    
    u = json.loads(rd)
    f = open('./helloworld/datas/ddls.txt','a')
    f2 = open('./helloworld/datas/counter.txt','r')
    counter = f2.readline()
    f2.close()
    f2 = open('./helloworld/datas/counter.txt','w')
    f2.write(str(int(counter)+1))
    f2.close()
    f.write(counter)
    f.write('\t')
    f.write(u['newname'])
    f.write('\t')
    f.write(u['newddl'])
    f.write('\t')
    f.write(u['newcontent'])
    f.write('\n')
    f.close()
    return HttpResponse(json.dumps(resp), content_type="application/json")

@csrf_exempt
def delete(req):
    resp=[{'stat':'ok'}]
    print('delete')
    u = json.loads(req.read().decode())
    delitem = u['id']
    print(u['id'])
    print(type(delitem))
    f = open("./helloworld/datas/ddls.txt",'r')
    data = f.readlines()
    f.close()
    f = open("./helloworld/datas/ddls.txt",'w')
    for item in data:
        if item.split()[0]!=delitem:
            f.write(item)
    return HttpResponse(json.dumps(resp), content_type="application/json")

@csrf_exempt
def modify(req):
    return 