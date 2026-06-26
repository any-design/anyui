import { useState } from 'react';
import { Accordion, AccordionItem } from '@any-design/anyui-react';

export default function AccordionDemo() {
  const [single, setSingle] = useState<string | number | undefined>(1);
  const [multi, setMulti] = useState<Array<string | number>>([1]);
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Single (accordion)</div>
        <div className="demo-row">
          <Accordion modelValue={single} onUpdateModelValue={setSingle} style={{ flex: 1, maxWidth: 420 }}>
            <AccordionItem value={1} title="What is AnyUI?">
              AnyUI is a cross-framework component library targeting Vue, React and Svelte.
            </AccordionItem>
            <AccordionItem value={2} title="Is it themeable?">
              Yes — every component ships with CSS variables and a token-based theme.
            </AccordionItem>
            <AccordionItem value={3} title="Disabled item" disabled>
              This item cannot be opened.
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="demo-block">
        <div className="demo-block__label">Multiple</div>
        <div className="demo-row">
          <Accordion modelValue={multi} mode="multiple" round onUpdateModelValue={setMulti} style={{ flex: 1, maxWidth: 420 }}>
            <AccordionItem value={1} title="First section">
              Several panels can stay open at the same time.
            </AccordionItem>
            <AccordionItem value={2} title="Second section">
              Toggle each independently.
            </AccordionItem>
            <AccordionItem value={3} title="Third section">
              Rounded corners via the round prop.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}