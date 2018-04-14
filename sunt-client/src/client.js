const API_PATH = 'http://localhost:8080/api/';
const IMAGE_PATH ='http://localhost:3000/images/';

function fetchResource(path) {
    return fetch(API_PATH + path).then(response => response.json());
}

class ProjectAPI {
    static get(index) {
        if (index === undefined) {
            console.error("index cannot be undefined");
        }

        return fetchResource("project/" + index);
    }

    static all() {
        return fetchResource("projects");
    }
}


export {fetchResource, ProjectAPI, IMAGE_PATH};