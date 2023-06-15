import os
import json
import glob
import numpy as np
import pandas as pd
import functions.version as version_parser


def find_dependencies_in_sboms(name: str, version: [str], exactMatch: bool) -> object:
    # output = {'label': source, 'name': source.lower(), 'type': source.lower(), 'results': []}
    output = []
    print("Searching for dependencies in SBOMs")
    path = './data/sboms'
    # search for each file in the folder and subfolders

    for file in glob.glob(path + '/**/*.json', recursive=True):
        if file.endswith(".json"):
            with open(file, encoding="utf-8") as json_file:
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
                    cols = ['name', 'version', 'purl']
                    df = df[cols]
                    df = df.rename(
                        columns={'name': 'label', 'id': 'license_id', 'url': 'reference_url'})
                elif str(type).find('SPDX') != -1:
                    packages = data['packages']
                    df = pd.json_normalize(packages)
                    cols = ['name', 'versionInfo']
                    externalRefs = pd.json_normalize(packages, record_path='externalRefs')
                    # get all where referenceType is 'PACKAGE-MANAGER'
                    purl = externalRefs[externalRefs['referenceType'] == 'purl']
                    purl = purl.reset_index(drop=True)
                    df = df[cols]
                    # add the reference url from purl to df
                    df['purl'] = purl['referenceLocator']
                    df = df.rename(
                        columns={'name': 'label', 'versionInfo': 'version'})
                else:
                    continue

                if exactMatch:
                    df = df[df['label'].str.lower() == name.lower()]
                else:
                    df = df[df['label'].str.contains(name, case=False)]

                df = check_versions(df, version)
                if not df.empty:
                    results = df.to_dict(orient='index')
                    for v in results.values():
                        v['sbomFile'] = file
                        v['dockerImage'] = image
                        projectName = v['dockerImage'].split(':')[0]
                        dockerVersion = v['dockerImage'].split(':')[1]
                    temp = {'name': projectName, 'version': dockerVersion, 'dockerImage': v['dockerImage'],
                            'sbomFile': v['sbomFile'],
                            'results': [{'label': v['label'], 'version': v['version'], 'purl': v['purl']} for v in
                                        results.values()]}
                    output.append(temp)

    return output


def create_random_key():
    import random
    import string

    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(10))


def check_versions(dataframe, versions):
    if isinstance(versions, list):
        version_filters = []
        for version in versions:
            if version.__contains__('-'):
                v = version.split('-')
                version_filters.append(
                    [version_parser.Version(v[0]) <= version_parser.Version(x) <= version_parser.Version(v[1]) for x in
                     dataframe['version']])
            elif version.startswith('>='):
                v = version[2:]
                version_filters.append(
                    [version_parser.Version(x) >= version_parser.Version(v) for x in dataframe['version']])
            elif version.startswith('<='):
                v = version[2:]
                version_filters.append(
                    [version_parser.Version(x) <= version_parser.Version(v) for x in dataframe['version']])
            elif version.startswith('>'):
                v = version[1:]
                version_filters.append(
                    [version_parser.Version(x) > version_parser.Version(v) for x in dataframe['version']])
            elif version.startswith('<'):
                v = version[1:]
                version_filters.append(
                    [version_parser.Version(x) < version_parser.Version(v) for x in dataframe['version']])
            else:
                version_filters.append(dataframe['version'].str.contains(version, case=False))
        return dataframe[np.logical_or.reduce(version_filters)]
    else:
        if versions.__contains__('-'):
            v = versions.split('-')
            return dataframe[
                [version_parser.Version(v[0]) <= version_parser.Version(x) <= version_parser.Version(v[1]) for x in
                 dataframe['version']]]
        elif versions.startswith('>='):
            v = versions[2:]
            return dataframe[[version_parser.Version(x) >= version_parser.Version(v) for x in dataframe['version']]]
        elif versions.startswith('<='):
            v = versions[2:]
            return dataframe[[version_parser.Version(x) <= version_parser.Version(v) for x in dataframe['version']]]
        elif versions.startswith('>'):
            v = versions[1:]
            return dataframe[[version_parser.Version(x) > version_parser.Version(v) for x in dataframe['version']]]
        elif versions.startswith('<'):
            v = versions[1:]
            return dataframe[[version_parser.Version(x) < version_parser.Version(v) for x in dataframe['version']]]
        else:
            return dataframe[dataframe['version'].str.contains(versions, case=False)]
