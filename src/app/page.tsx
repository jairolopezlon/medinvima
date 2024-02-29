'use client'

import { Hero, HomeContact, HomeFooter, HomeNextFeatures, OnboardingUseApp } from '@components/organisms'

export default function Home(): React.JSX.Element {
  return (
    <div>
      <Hero />
      <OnboardingUseApp />
      <HomeNextFeatures />
      <HomeContact />
      <HomeFooter />
    </div>
  )
}
