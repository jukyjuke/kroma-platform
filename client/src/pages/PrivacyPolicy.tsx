import { Layout } from "../components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8">
          Politique de Confidentialité
        </h1>

        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Bienvenue sur KROMA. Nous nous engageons à protéger vos données
              personnelles et votre vie privée. Cette politique de
              confidentialité explique comment nous collectons, utilisons et
              protégeons vos informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              2. Collecte des données
            </h2>
            <p>
              Nous collectons les informations que vous nous fournissez lorsque
              vous créez un compte, telles que votre nom, votre adresse email et
              votre mot de passe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              3. Utilisation des données
            </h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Gérer votre compte et vous fournir nos services.</li>
              <li>Améliorer et personnaliser votre expérience utilisateur.</li>
              <li>
                Vous envoyer des notifications importantes concernant le
                service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              4. Protection des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et
              organisationnelles appropriées pour protéger vos données contre
              tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Vos droits</h2>
            <p>
              Vous avez le droit d'accéder, de corriger ou de supprimer vos
              données personnelles. Vous pouvez exercer ces droits en nous
              contactant via notre formulaire de contact ou les paramètres de
              votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer la fonctionnalité de
              notre site et analyser l'utilisation. En utilisant notre site,
              vous consentez à l'utilisation de cookies conformément à cette
              politique.
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
