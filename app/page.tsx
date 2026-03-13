import TypewriterIntro from './(site)/components/typewriter-intro'
import VirtualIdCard from './(site)/components/virtual-id-card'

export default function Home(): JSX.Element {
  return (
    <section className="space-y-12">
      <VirtualIdCard />
      <TypewriterIntro />
    </section>
  )
}
