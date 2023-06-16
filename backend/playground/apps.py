import os
import shlex

from django.apps import AppConfig


class PlaygroundConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'playground'

    def ready(self):
        import os
        import subprocess
        from playground.models import newDataSource as DataSource

        def clone_datasource(name):

            if not os.path.exists('./data/sboms'):
                os.makedirs('./data/sboms', exist_ok=True)

            repo_path = f'./data/sboms/{name}'
            current_datasource = DataSource.objects.get(name=name)
            repo_url = current_datasource.url
            absolute_key_path = os.path.abspath(f'./data/keys/{name}_private_key')
            absolute_key_path = absolute_key_path.replace('\\', '/')


            if not os.path.exists(repo_path):
                subprocess.run(shlex.split(f'git config --global core.sshCommand "ssh -i \'{absolute_key_path}\' -F /dev/null"'))
                subprocess.run(shlex.split(f'git clone \'{repo_url}\' \'{repo_path}\''))
            else:
                subprocess.run(shlex.split(f'git config --global core.sshCommand "ssh -i \'{absolute_key_path}\' -F /dev/null"'), cwd=repo_path)
                subprocess.run(shlex.split('git pull'), cwd=repo_path)




        for datasource in DataSource.objects.all():
            clone_datasource(datasource.name)
