import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      
      <div className="text-center space-y-4 p-10 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20">
        
        <h1 className="text-4xl font-bold text-white">
          Daily Flow
        </h1>

        <p className="text-lg text-purple-200">
          Good morning, friend ☀️
        </p>
        <p className="text-xl font-semibold text-white">
          {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>

        <p className="text-sm text-purple-300">
          Let’s focus on what matters today.
        </p>

      </div>

    </div>
  );
}


