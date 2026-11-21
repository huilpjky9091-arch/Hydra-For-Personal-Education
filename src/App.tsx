import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AnatomySection } from './components/sections/AnatomySection';
import { CellBiologySection } from './components/sections/CellBiologySection';
import { NematocystSection } from './components/sections/NematocystSection';
import { DigestiveSystemSection } from './components/sections/DigestiveSystemSection';
import { EnzymeSecretionSection } from './components/sections/EnzymeSecretionSection';
import { ExcretionSection } from './components/sections/ExcretionSection';
import { FeedingSimulationSection } from './components/sections/FeedingSimulationSection';
import { PhysiologySection } from './components/sections/PhysiologySection';
import { RegenerationSection } from './components/sections/RegenerationSection';
import { ReproductionSection } from './components/sections/ReproductionSection';
import { KnowledgeCenterSection } from './components/sections/KnowledgeCenterSection';

export function App() {
  const [selectedAnatomyId, setSelectedAnatomyId] = useState<string>('hypostome');

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection onJumpToAnatomyPart={(partId) => setSelectedAnatomyId(partId)} />
        <AnatomySection
          selectedId={selectedAnatomyId}
          onSelectId={setSelectedAnatomyId}
        />
        <CellBiologySection />
        <NematocystSection />
        <DigestiveSystemSection />
        <EnzymeSecretionSection />
        <ExcretionSection />
        <FeedingSimulationSection />
        <PhysiologySection />
        <RegenerationSection />
        <ReproductionSection />
        <KnowledgeCenterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
