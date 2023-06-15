from git import Repo
import paramiko
from playground.models import newDataSource as DataSource
from django.apps import AppConfig

class FunctionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'functions'

    def ready(self):
        clone_datasource('pw-demo-sboms')
def clone_datasource(name):
    repo_path = '/data/sboms/'
    datasource = DataSource.objects.get(name=name)
    repo_url = datasource.url
    key = datasource.key
    repo = Repo.clone_from(repo_url, repo_path, key=key)


def fetch_datasource():
    pass

