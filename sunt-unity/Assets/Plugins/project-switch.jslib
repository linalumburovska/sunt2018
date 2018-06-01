mergeInto(LibraryManager.library, {
    RequestProject: function (project) {
        projectView = document.getElementById("project-view");

        p = document.createElement("p");
        p.innerText = project;
        projectView.appendChild(p);
    },
});