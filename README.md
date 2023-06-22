# Dependify

## Description
Dependify is a web-based tool designed to simplify the process of searching through Software Bill of Materials (SBOMs). It provides a user-friendly interface that allows you to search and analyze SBOMs obtained from various data sources, such as repositories filled with SBOMs.

## Features
- SBOM Search: Dependify enables you to search through SBOMs using a simple and intuitive search interface. You can enter keywords or specific criteria to find relevant information within the SBOMs.
- Data Sources: The application integrates with different data sources, particularly repositories that contain SBOMs. These data sources provide a vast collection of SBOMs that users can explore and search through.
- Docker Image: Dependify offers a convenient way to access the application by providing a Docker image available on Docker Hub. The Docker image is hosted at the following repository: `the0danktor/dependify`.

## Getting Started

### Prerequisites
To run Dependify, make sure you have the following prerequisites installed on your system:
- Docker: Ensure that Docker is installed and properly configured on your machine. You can download and install Docker from the official website: https://www.docker.com/get-started.

### Installation
1. Open a terminal or command prompt.
2. Pull the Dependify Docker image from Docker Hub by running the following command:
`docker pull the0danktor/dependify:latest`
3. Once the image is downloaded, you can start the Dependify container by executing the following command:
`docker run -p 8000:8000 -p 3000:3000 -v /yourPath/to/dataStorage:/app/data the0danktor/dependify:latest`
4. After executing the command, Dependify will be up and running on your local machine. You can access it by opening a web browser and navigating to `http://localhost:3000`.

## Usage
1. Open your web browser and navigate to the Dependify application using the URL: `http://localhost:3000`.
2. Once the application is loaded, you will be presented with the dashboard that will guide you to the datasource page.
3. There you can add a new datasource by clicking on the "Add Data Source" button.
4. You will be presented with a form where you can enter the name of the datasource and the URL of the datasource.
5. Now that you have added a datasource, you can go to the scan page and enter your query.
6. Click the scan button or press Enter to initiate the search.
7. Dependify will process your query and display the results based on the SBOMs obtained from the data sources.
8. Explore the search results to find the relevant SBOMs or Docker images that match your criteria.

## Contributions
Contributions to Dependify are welcome! If you find any issues or would like to suggest improvements, please submit them to the GitHub repository of the project: [link to repository].

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


