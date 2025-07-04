
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Play, Users, ThumbsUp, Radio, Music, Headphones, Zap } from "lucide-react"
import { Appbar } from "./components/Appbar"
import { signIn } from "next-auth/react"


export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="px-4  lg:px-6 h-16 flex items-center justify-center backdrop-blur-sm bg-black/20 border-b border-gray-800/50">
        <Appbar />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Stream Music
                  <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Together
                  </span>
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Choose, vote, and create streams with friends
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold border-0 px-8 py-3 text-lg shadow-lg shadow-emerald-500/25"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Streaming
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800/50 px-8 py-3 text-lg bg-transparent"
                >
                  <Radio className="mr-2 h-5 w-5" />
                  Join Stream
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 text-center hover:bg-gray-800/50 transition-colors">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <Headphones className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Choose Music</h3>
                  <p className="text-gray-400">Pick from millions of tracks</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 text-center hover:bg-gray-800/50 transition-colors">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                    <ThumbsUp className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Vote Together</h3>
                  <p className="text-gray-400">Upvote your favorites</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 text-center hover:bg-gray-800/50 transition-colors">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                    <Radio className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Create Streams</h3>
                  <p className="text-gray-400">Start your own radio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25">
                <Zap className="h-10 w-10 text-black" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Stream?
              </h2>
              <p className="max-w-[600px] text-gray-400 md:text-lg">
                Join thousands creating the perfect playlist together
              </p>
              <Button

                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold border-0 px-12 py-4 text-lg shadow-lg shadow-emerald-500/25"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Started Free
              </Button></div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-6 backdrop-blur-sm bg-black/20 border-t border-gray-800/50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded flex items-center justify-center">
              <Music className="h-4 w-4 text-black" />
            </div>
            <span className="text-sm text-gray-400">© 2024 StreamTogether</span>
          </div>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
