import { Layout } from "../components/Layout";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8">
          Conditions d'Utilisation
        </h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              1. Acceptation des conditions
            </h2>
            <p>
              En accédant à KROMA et en l'utilisant, vous acceptez d'être lié
              par les présentes conditions d'utilisation. Si vous n'acceptez pas
              ces conditions, veuillez ne pas utiliser nos services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              2. Compte utilisateur
            </h2>
            <p>
              Pour accéder à certaines fonctionnalités, vous devez créer un
              compte. Vous êtes responsable du maintien de la confidentialité de
              votre compte et de votre mot de passe, ainsi que de toutes les
              activités qui s'y déroulent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              3. Utilisation du service
            </h2>
            <p>
              Vous vous engagez à utiliser KROMA uniquement à des fins légales
              et conformément à ces conditions. Il est interdit de :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Violer les lois en vigueur.</li>
              <li>Porter atteinte aux droits de propriété intellectuelle.</li>
              <li>
                Transmettre des virus ou tout code de nature destructrice.
              </li>
              <li>Tenter d'accéder sans autorisation à nos systèmes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              4. Propriété intellectuelle
            </h2>
            <p>
              Tout le contenu présent sur KROMA (textes, graphismes, logos,
              images, code) est la propriété de KROMA ou de ses concédants de
              licence et est protégé par les lois sur la propriété
              intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              5. Résiliation
            </h2>
            <p>
              Nous nous réservons le droit de suspendre ou de supprimer votre
              compte à tout moment, sans préavis, en cas de violation de ces
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              6. Modifications des conditions
            </h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout
              moment. Les modifications prendront effet dès leur publication sur
              le site. Il est de votre responsabilité de consulter régulièrement
              ces conditions.
            </p>
          </section>

          <p className="mt-8 text-sm text-slate-500">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
