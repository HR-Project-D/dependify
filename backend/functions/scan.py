import os
import json
import pandas as pd


def find_dependencies_in_sboms(name: str, version: str, source: str) -> object:
    results = {}
    output = {'name': source, 'label': source, 'type': source}
    print("Searching for dependencies in SBOMs")
    path = './functions/sboms'
    for file in os.listdir(path):
        if file.endswith(".json"):
            with open(path + '\\' + file, encoding="utf-8") as json_file:
                data = json.load(json_file)
                try:
                    type = data['bomFormat']
                    image = data['metadata']['component']['name']
                except:
                    1 + 1
                try:
                    type = data['spdxVersion']
                    image = data['name']
                except:
                    1 + 1
                if type == 'CycloneDX':
                    components = data['components']
                    df = pd.json_normalize(components)
                    cols = ['name', 'version']
                    df = df[cols]
                    df = df.rename(
                        columns={'name': 'label', 'id': 'license_id', 'url': 'reference_url'})
                    df = check_version(df, version)
                    df = df[df['label'].str.contains(name, case=False)]
                    if not df.empty:
                        results = df.to_dict(orient='index')
                        for v in results.values():
                            v['sbomFile'] = file
                            v['sbomFormat'] = type
                            v['dockerImage'] = image
                        output['results'] = [{'label': v['label'], 'version': v['version'], 'sbomFile': v['sbomFile'],
                                         'sbomFormat': v['sbomFormat'], 'dockerImage': v['dockerImage']} for v in results.values()]

                    continue
                elif str(type).find('SPDX') != -1:
                    packages = data['packages']
                    df = pd.json_normalize(packages)
                    cols = ['name', 'versionInfo']
                    df = df[cols]
                    df = df.rename(
                        columns={'name': 'label', 'versionInfo': 'version'})
                    df = check_version(df, version)
                    df = df[df['name'].str.contains(name, case=False)]
                    if not df.empty:
                        results[file] = df.to_dict(orient='index')
                        for v in results.values():
                            v['file'] = file
                            v['sbomFormat'] = type
                            v['dockerImage'] = image
                        output['results'] = [{'label': v['label'], 'version': v['version'], 'sbomFile': v['sbomFile'],
                                         'sbomFormat': v['sbomFormat'], 'dockerImage': v['dockerImage']} for v in
                                        results.values()]
                    continue
                else:
                    continue

    return output


def check_version(dataframe, version):
    if version.__contains__('-'):
        v = version.split('-')
        return dataframe[[v[0] <= x <= v[1] for x in dataframe['version']]]
    elif version.startswith('>='):
        v = version[2:]
        return dataframe[[x >= v for x in dataframe['version']]]
    elif version.startswith('<='):
        v = version[2:]
        return dataframe[[x <= v for x in dataframe['version']]]
    elif version.startswith('>'):
        v = version[1:]
        return dataframe[[x > v for x in dataframe['version']]]
    elif version.startswith('<'):
        v = version[1:]
        return dataframe[[x < v for x in dataframe['version']]]
    else:
        return dataframe[dataframe['version'].str.contains(version, case=False)]
