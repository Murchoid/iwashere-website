import { FeatureGrid } from '#/components/FeatureGrid'
import Footer from '#/components/Footer'
import Header from '#/components/Header'
import { Hero } from '#/components/Hero'
import { QuickInstall } from '#/components/QuickInstall'
import { StatsBar } from '#/components/StatsBar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Header />
      <Hero />
      <FeatureGrid/>
      <QuickInstall/>
      <StatsBar/>
      <Footer/>
    </main>
  )
}
