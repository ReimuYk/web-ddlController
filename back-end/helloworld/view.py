from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def hello(request):
    resp = [{'errorcode': '100', 'detail': 'Get success'}]
    li = ['l1','l2','l333']
    print("hello")
    return HttpResponse(json.dumps(li), content_type="application/json")
    return HttpResponse(json.dumps(resp), content_type="application/json")

def hello2(req):
    resp = ['a','b','c']
    return HttpResponse(json.dumps(resp),content_type="application/json")

@csrf_exempt
def newblock(req):
    resp=[{'stat':'ok'}]
    print("newnewnew")
    # form = ContactForm(req.POST)
    # q = req.POST
    r = req.read()
    print(r,type(r))
    print(r.decode(),type(r.decode()))
    rd = r.decode()
    print(json.loads(rd),type(json.loads(rd)))
    # print(rd["postData"])

    return HttpResponse(json.dumps(resp), content_type="application/json")