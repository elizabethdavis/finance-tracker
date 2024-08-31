import SignIn from "./SignIn";

const WelcomeScreen: React.FC = () => (
  <div className="welcome-screen p-8 max-w-2xl mx-auto">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Template</h1>
    <p className="mb-4">
      This template is a simple social media app that allows users to sign in,
      post images with text, and see a public feed.
    </p>
    <div className="mb-4">
      <img
        src="/app.png"
        alt="App structure diagram"
        className="rounded-lg shadow-md"
      />
    </div>
    <h2 className="text-2xl font-semibold mb-2">Features:</h2>
    <ul className="list-disc list-inside mb-4">
      <li>User authentication with Google Sign-In</li>
      <li>Create posts with images and captions</li>
      <li>View a public feed of all posts</li>
      <li>Personal profile page</li>
    </ul>
    <SignIn />
  </div>
);

export default WelcomeScreen;
