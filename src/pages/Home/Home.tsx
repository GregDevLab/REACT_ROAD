import { Link } from "react-router-dom"

const Home = () => {

	return (
		<>
			<header className='pb-5'>
				<h1>Bienvenue sur DevPath</h1>
				<em>Votre route pour le développement web</em>
			</header>
			<section className='pb-5'>
				<h3>Pourquoi DevPath</h3>
				<p>
					DevPath est une plateforme communautaire conçue pour les apprenants en développement web. Nous avons constaté que l'apprentissage du développement web peut être un défi, en particulier lorsque vous ne savez pas par où commencer ou quelle technologie apprendre ensuite. DevPath vous aide à résoudre ce problème en vous permettant de créer des 'roadmaps' d'apprentissage personnalisées, de partager vos roadmaps avec d'autres et de collaborer sur des roadmaps communes
				</p>
			</section>
			<section className='pb-5'>
				<h3>Comment cela fonctionne :</h3>
				<p className='pb-2'>
					Sur DevPath, vous pouvez créer votre propre roadmap d'apprentissage. Une roadmap est un plan d'étude personnalisé que vous pouvez utiliser pour organiser votre parcours d'apprentissage. Vous pouvez ajouter différents sujets, tels que des langages de programmation, des frameworks ou des concepts, et inclure des ressources d'apprentissage, des liens, des vidéos et des notes de code.		
				</p>
				<p className='pb-2'>
					Une fois que vous avez créé une roadmap, vous pouvez la partager avec d'autres sur DevPath. Les autres utilisateurs peuvent consulter votre roadmap, la commenter et même la copier et l'adapter à leurs propres besoins.		
				</p>
				<p className='pb-2'>
					En outre, vous pouvez participer aux forums thématiques sur DevPath pour discuter de différents sujets de développement web, poser des questions et aider d'autres apprenants		
				</p>
			</section>
			<section className='pb-5'>
				<h3>Rejoignez-nous :</h3>
				<p className='pb-2'>
					Prêt à commencer votre parcours d'apprentissage du développement web avec DevPath ?<br></br><Link to='/inscription'>Inscrivez-vous</Link> gratuitement dès aujourd'hui ou <Link to='/connexion'>connectez-vous</Link> si vous avez déjà un compte		
				</p>
			</section>
		</>
	)

}

export default Home