import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Sparkles, Send, AlertTriangle } from 'lucide-react';

const quickPrompts = ['My pet has a minor scrape', 'List of toxic foods for cats', 'Why is my puppy crying at night?'];

const AIAssistantPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setResponse(`**Possible Causes:**\n• This could be normal behavior\n• May indicate discomfort\n\n**Immediate Care Tips:**\n• Monitor for 24 hours\n• Ensure fresh water available\n\n**When to Consult a Vet:**\n⚠️ If symptoms persist beyond 48 hours or worsen`);
  };

  return (
    <Layout>
      <div className="content-container py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" /> AI Care Assistant
        </h1>
        <p className="text-muted-foreground mb-8">Get instant guidance on your pet's health and behavior</p>

        <div className="relative mb-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask about your pet (e.g., 'My dog ate chocolate')" className="input-premium pr-12" />
          <button onClick={handleSubmit} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg">
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {quickPrompts.map((p) => (
            <button key={p} onClick={() => setQuery(p)} className="filter-chip text-xs">{p}</button>
          ))}
        </div>

        {response && (
          <div className="card-premium p-6 whitespace-pre-wrap">{response}</div>
        )}

        <p className="text-xs text-muted-foreground mt-6 text-center">
          This AI tool provides general information and is not a substitute for professional veterinary advice.
        </p>
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
