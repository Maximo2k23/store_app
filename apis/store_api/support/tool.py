
class Tool:
    def __init__(self):
        None
    
    def filter_dic(self, data):
        resp = {k:v for (k, v) in data.items() if v != '' and v != 0}
        return resp
