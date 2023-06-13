import os

from django.apps import AppConfig


class PlaygroundConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'playground'

    def ready(self):
        print('ready')
        from git import Repo, RemoteProgress
        import paramiko
        from playground.models import DataSource

        def clone_datasource(name):
            repo_path = f'./data/sboms/{name}'
            datasource = DataSource.objects.get(name=name)
            repo_url = datasource.url
            key = datasource.key
            private_key = paramiko.RSAKey.from_private_key_file(f"data/keys/{name}_private_key.pem")
            try:
                repo = Repo.clone_from(repo_url, repo_path,
                                       env={'GIT_SSH_COMMAND': f'ssh -i data/keys/{name}_private_key.pem'})
            except:
                # TODO: fetch from remote if repo already exists
                bare_repo = Repo.init(repo_path)
                origin = bare_repo.remote(name='origin')
                if origin.exists():
                    bare_repo.delete_remote('origin')
                origin = bare_repo.create_remote('origin', repo_url)
                with bare_repo.git.custom_environment(GIT_SSH_COMMAND=f'ssh -i data/keys/{name}_private_key.pem'):
                    origin.fetch()
                    origin.pull()


        def fetch_datasource():
            pass

        clone_datasource('pw-demo-sboms')
