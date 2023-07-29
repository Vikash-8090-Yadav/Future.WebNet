const generateLiTags = (projectsData) => {
	const liTags = [];
	for (let tagNumber = 1; tagNumber <= 64; tagNumber++) {
		const projectData = projectsData[tagNumber.toString()];

		if (projectData) {
			const { projectTitle, projectUrl, thumbnailUrl } = projectData;

			const liTag = `
          <li class="project-item active" data-filter-item data-category="open source">
            <a href="./Frontend-Projects/${projectUrl}" target = "_blank" aria-label=${projectTitle}>
              <figure class="project-img">
                <div class="project-item-icon-box" style="font-size: 2.25rem;">👨🏻‍💻</div>
                <img src="./assets/images/${thumbnailUrl}" alt="${projectTitle}" loading="lazy">
              </figure>
              <h3 class="project-title"><a href="https://github.com/Vikash-8090-Yadav/Future.WebNet/tree/main/Frontend-Projects/${projectUrl}" target="_blank" aria-label=${projectTitle}>${tagNumber}. ${projectTitle} 🔗</a></h3>
            </a>
          </li>
        `;

			liTags.push(liTag);
		}
	}

	return liTags.join('\n');
};

// Fetch the project data from the JSON file
fetch('./assets/data/projectsData.json')
	.then(response => response.json())
	.then(projectsData => {
		const projectListContainer = document.querySelector('.project-list');
		projectListContainer.innerHTML = generateLiTags(projectsData);
		getPageNumbers();
		getProjectsInPage();
	})
	.catch(error => console.error('Error fetching project data:', error));


window.addEventListener('scroll', function () {
	var scrollToTopButton = document.getElementById('progress');
	if (window.pageYOffset > 200) {
		scrollToTopButton.style.display = 'block';
	} else {
		scrollToTopButton.style.display = 'none';
	}
});
