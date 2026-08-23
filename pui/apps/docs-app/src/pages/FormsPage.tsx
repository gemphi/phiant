import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Input, Select, Textarea, Checkbox, Radio, Form, FormField, FormRow, FormActions, Stepper, Slider, Button, Row, Col, Stack } from '@phi/pui';
import { Search, Mail } from 'lucide-react';

export default function FormsPage() {
  const [stepperVal, setStepperVal] = React.useState(3);
  const [sliderVal, setSliderVal] = React.useState(50);

  return (
    <PageShell>
      <PageHeader
        title="Forms"
        description="Input, Select, Textarea, Checkbox, Radio, Form, FormField, FormRow, FormActions, Stepper, Slider"
      />

      <Showcase title="Input" description="Text input with optional icon and error state">
        <Row xs={1} sm={2} lg={4} gap={3}>
          <Col><Input placeholder="Basic input" /></Col>
          <Col><Input placeholder="With icon" icon={<Search size={16} />} /></Col>
          <Col><Input placeholder="Error state" error /></Col>
          <Col><Input placeholder="Disabled" disabled /></Col>
        </Row>
      </Showcase>

      <Showcase title="Select" description="Native select with error state">
        <Row xs={1} sm={2} gap={3}>
          <Col>
            <Select defaultValue="">
              <option value="" disabled>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </Col>
          <Col>
            <Select error defaultValue="">
              <option value="" disabled>Error select</option>
              <option value="1">Option 1</option>
            </Select>
          </Col>
        </Row>
      </Showcase>

      <Showcase title="Textarea" description="Multi-line text input">
        <Row xs={1} sm={2} gap={3}>
          <Col><Textarea placeholder="Enter your message..." rows={4} /></Col>
          <Col><Textarea placeholder="Error state" error rows={3} /></Col>
        </Row>
      </Showcase>

      <Showcase title="Checkbox" description="Checkbox with label">
        <Row xs={1} sm={2} lg={4} gap={3}>
          <Col><Checkbox label="Accept terms and conditions" /></Col>
          <Col><Checkbox label="Subscribe to newsletter" defaultChecked /></Col>
          <Col><Checkbox label="Error state" error /></Col>
          <Col><Checkbox label="Disabled" disabled /></Col>
        </Row>
      </Showcase>

      <Showcase title="Radio" description="Radio buttons with labels">
        <Row xs={1} sm={2} lg={4} gap={3}>
          <Col><Radio label="Option A" name="group1" defaultChecked /></Col>
          <Col><Radio label="Option B" name="group1" /></Col>
          <Col><Radio label="Option C" name="group1" /></Col>
          <Col><Radio label="Disabled" name="group1" disabled /></Col>
        </Row>
      </Showcase>

      <Showcase title="Form" description="Complete form with FormField, FormRow, and FormActions">
        <Form title="Contact Us" onSubmit={(e) => e.preventDefault()}>
          <FormRow>
            <FormField label="Full Name">
              <Input placeholder="John Doe" />
            </FormField>
            <FormField label="Email">
              <Input placeholder="john@example.com" type="email" icon={<Mail size={16} />} />
            </FormField>
          </FormRow>
          <FormField label="Message">
            <Textarea placeholder="Your message..." rows={3} />
          </FormField>
          <FormActions>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </FormActions>
        </Form>
      </Showcase>

      <Showcase title="Stepper" description="Quantity stepper with min/max">
        <Row xs={1} sm={3} gap={3}>
          <Col><Stepper value={stepperVal} onChange={setStepperVal} min={1} max={10} /></Col>
          <Col><Stepper value={1} min={1} max={5} onChange={() => {}} /></Col>
          <Col><Stepper value={5} min={1} max={5} onChange={() => {}} /></Col>
        </Row>
      </Showcase>

      <Showcase title="Slider" description="Range slider with label, value display, min/max/step, and disabled state">
        <Row xs={1} sm={2} gap={4}>
          <Col>
            <Slider
              label="Volume"
              showValue
              value={sliderVal}
              onChange={setSliderVal}
              min={0}
              max={100}
              step={1}
            />
          </Col>
          <Col>
            <Slider
              label="Opacity"
              showValue
              defaultValue={75}
              min={0}
              max={100}
              step={5}
            />
          </Col>
        </Row>
        <Row xs={1} sm={2} gap={4}>
          <Col>
            <Slider label="Disabled" showValue defaultValue={30} disabled />
          </Col>
          <Col>
            <Slider defaultValue={20} min={0} max={50} step={10} />
          </Col>
        </Row>
      </Showcase>
    </PageShell>
  );
}
