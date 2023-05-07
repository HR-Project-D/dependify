import os
import json
import pandas as pd


def find_dependencies_in_sboms(name: str, version: str) -> object:
    results = {}
    print("Searching for dependencies in SBOMs")
    path = './functions/sboms'
    for file in os.listdir(path):
        if file.endswith(".json"):
            with open(path + '\\' + file, encoding="utf-8") as json_file:
                data = json.load(json_file)
                try:
                    type = data['bomFormat']
                except:
                    1 + 1
                try:
                    type = data['spdxVersion']
                except:
                    1 + 1

                if type == 'CycloneDX':
                    components = data['components']
                    df = pd.json_normalize(components)
                    cols = ['type', 'name', 'version', 'licenses']
                    df = df[cols]
                    df = df.rename(
                        columns={'id': 'license_id', 'url': 'reference_url', 'type': 'reference_type'})
                    df = check_version(df, version)
                    df = df[df['name'].str.contains(name, case=False)]
                    if not df.empty:
                        results[file] = df.to_dict()
                    continue
                elif str(type).find('SPDX') != -1:
                    packages = data['packages']
                    df = pd.json_normalize(packages)
                    cols = ['name', 'versionInfo', 'licenseConcluded']
                    df = df[cols]
                    df = df.rename(
                        columns={'versionInfo': 'version', 'licenseConcluded': 'license_id'})
                    df = check_version(df, version)
                    df = df[df['name'].str.contains(name, case=False)]
                    if not df.empty:
                        results[file] = df.to_dict()
                    continue
                else:
                    continue

    return json.dumps(results)


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


