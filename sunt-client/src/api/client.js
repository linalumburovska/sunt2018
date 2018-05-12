const API_PATH = 'http://localhost:8080/api/';
const IMAGE_PATH ='http://localhost:3000/images/';

function fetchResource(path) {
    return fetch(API_PATH + path).then(response => response.json());
}

class ProjectAPI {
    static pagination() {
        return fetchResource("projects");
    }

    static get(index) {
        if (index === undefined) {
            console.error("index cannot be undefined");
        }

        return fetchResource("project/" + index);
    }

    static all() {
        return fetchResource("project");
    }
}

class AuthorAPI {
    static pagination() {
        return fetchResource("authors");
    }

    static get(id) {
        if (id === undefined) {
            console.error("id cannot be undefined");
        }

        return fetchResource("author/" + id);
    }

    static all() {
        return fetchResource("author")
    }
}

export {fetchResource, ProjectAPI, AuthorAPI, IMAGE_PATH};