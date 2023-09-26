// Create route components
const Home = {
    template: 
    `<main id="home">
        <div class="about__me">
            <img src="./assets/img/jawad.JPEG" alt="">
            <h1>Muhammad Jawad Sadiq</h1>
            <h3>Associate Software Engineer</h3>
            <p>Trying to Craft digital experiences that leave an impact. </p>
    
            <div class="skills_projects_link"><router-link to="/projects">Projects/Skills</router-link> </div>
        </div>
    </main>`
}
const Projects = {
    template: 
    `<div>
        <header id="site_header" class="container d_flex">
            <div class="bio__media">
                <img src="./assets/img/jawad.JPEG" alt="">
                <div class="bio__media__text">
                    <h1>Muhammad Jawad Sadiq</h1>
                    <h3>Associate Software Engineer</h3>
                    <p>Trying to Craft digital experiences that leave an impact. </p>
                </div>
            </div>
            <nav>
                <router-link to='/'>Home</router-link>
                <router-link to="/projects">Project</router-link>
                <a href="https://">
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
            </nav>
        </header>
    
         <main class="container">
            <div class="error" v-if="errors"> 
                Sorry! It seems we can't fetch data righ now 😥
            </div>

            <section id="portfolio" v-else>
                <div class="loading" v-if="loading">😴 Loading ... </div>
                <div class="projects" v-else>
                     <div v-for="project in projectsList" class="card__custom" >
                        <div class="card__custom__text">
                            <div>
                                <h3>{{trimedTitle(project.name)}}</h3>
                                <p>{{trimedText(project.description)}}</p>                        
                            </div>
                    
                            <div class="meta__data d_flex">
                                <div class="date">
                                    <h5>Updated at</h5>
                                    <div>{{new Date(project.updated_at).toDateString()}}</div>
                                </div>
                                <img class="avatar" :src="project.owner.avatar_url">
                    
                            </div>
                        </div>
                        <div class="card__custom__img"></div>
                        <div class="card_custom__button">
                            <a :href="project.html_url" target="_blank">
                                Code
                            </a>
                        </div>
                    
                    
                    </div>


                    <div style="text-align: center; width:100%" v-if="!loading" >
                        <div v-if="projectsList.length < projects.length">
                            <button class="btn_load_more" v-on:click="loadMore()">Load More</button>
                        </div>
                        <div v-else>
                            <a href="https://www.linkedin.com/in/muhammad-jawad-sadiq/" target="_blank" rel="noopener noreferrer">Visit My LinkedIn</a>
                        </div>

                    </div>

                    <div id="skills_section">
                        <h2>Development Skills</h2>
                        <ul class="skills">
                            <li v-for="skill in skills">{{skill}}</li>
                        </ul>
                    </div>
                </div>
            </section>
        
           
        </main>
    </div>`,
data() { 
    return {
        data: [],
        projects: [],
        projectsList: null,
        skills: [],
        projectsCount: 5,
        perPage: 20,
        page: 1,
        loading: true,
        errors: false,
        }
    },
    methods: {
        trimedTitle: function(text){
            let title = text.replaceAll("-", " ").replace("_", " ")
            if(title.length > 15) {
                return title.slice(0, 12) + ' ...'
            } return title;
        
        },
        trimedText: function(text){
            //console.log(text.slice(0, 100));
            if(text === null) {
                return 'This project has no description yet!';
            } else if(text.length > 100) {
                return text.slice(0, 100) + ' ...'
            } 
            return text;
        
        },
        getProjects: function(){

            this.projectsList = this.projects.slice(0, this.projectsCount);
            return this.projectsList;
        
        },
        fetchData: function(){
            axios
            .get(`https://api.github.com/users/mjawadsadiq78/repos?per_page=${this.perPage}&page=${this.page}`)
            .then(
                response => {
                    this.projects = response.data;
                    this.projects.forEach(project =>{
                        if (project.language !== null && ! this.skills.includes(project.language)) { 
                            this.skills.push(project.language)
                        };
                    });
                }
            )
            .catch(error=> {
                console.log(error);
                this.errors = true;
            })
            .finally(() => { 
                this.loading = false
                this.getProjects();
            })
        }, 
        loadMore(){
            
            if(this.projectsList.length <= this.projects.length){
                this.projectsCount += 5;
                this.projectsList = this.projects.slice(0, this.projectsCount)
            }
            
        
        }
        
    },
    mounted(){  

        setTimeout(this.fetchData, 3000 );
        
    }
}

// Define routes
const routes = [
    {path: '/', component: Home},
    {path: '/projects', component: Projects},
];


// create the router instance
const router = new VueRouter({
    routes
})

// create and mount the vue instance
const app = new Vue({
    router
}).$mount('#app');