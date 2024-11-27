import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold mb-8">Landing</h1>
    <p className="text-xl mb-8">This is where you&apos;d display your users or user-related content.</p>
    <Link 
      href="/users" 
      className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300"
    >
    Go To Dashboard
    </Link>
  </div>
  );
}
