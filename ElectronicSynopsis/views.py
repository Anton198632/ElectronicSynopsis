from django.shortcuts import render
from django.views.generic import TemplateView


class Main(TemplateView):

    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})