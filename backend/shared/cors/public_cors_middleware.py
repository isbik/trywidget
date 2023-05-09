

class PublicCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/public"):
            response = self.get_response(request)
            response["Access-Control-Allow-Origin"] = request.META.get(
                "HTTP_ORIGIN")
            response["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,PATCH,OPTIONS"
            response["Access-Control-Max-Age"] = "1000"
            response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type,Accept, Origin"

            return response

        return self.get_response(request)
