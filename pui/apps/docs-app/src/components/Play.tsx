import React from 'react';
import {
  Title, Text, Divider, Stack, Span, Card,
  Button, Input, Checkbox, Select,
} from '@phient/pui';
import styles from './Play.module.scss';

type ControlType = 'select' | 'boolean' | 'text' | 'number';

export type ControlConfig = {
  name: string;
  type: ControlType;
  label: string;
  options?: string[];
  defaultValue?: string | boolean | number;
  min?: number;
  max?: number;
  step?: number;
};

export type ComponentPlay = {
  name: string;
  title: string;
  description?: string;
  controls: ControlConfig[];
  render: (values: Record<string, string | boolean | number>) => React.ReactNode;
  code?: (values: Record<string, string | boolean | number>) => string;
};

type PlayProps = {
  components: ComponentPlay[];
};

export const Play = ({ components }: PlayProps) => {
  const [active, setActive] = React.useState(components[0]?.name ?? '');
  const selected = components.find((c) => c.name === active) ?? components[0];

  const [values, setValues] = React.useState<Record<string, Record<string, string | boolean | number>>>(() => {
    const initial: Record<string, Record<string, string | boolean | number>> = {};
    components.forEach((component) => {
      initial[component.name] = {};
      component.controls.forEach((control) => {
        initial[component.name][control.name] = control.defaultValue ?? (control.type === 'boolean' ? false : control.type === 'number' ? 0 : '');
      });
    });
    return initial;
  });

  const update = (componentName: string, name: string, value: string | boolean | number) => {
    setValues((prev) => ({
      ...prev,
      [componentName]: { ...prev[componentName], [name]: value },
    }));
  };

  const currentValues = selected ? values[selected.name] ?? {} : {};
  const snippet = selected?.code ? selected.code(currentValues) : '';

  return (
    <Card hoverable={false} className={styles.play}>
      <aside className={styles.sidebar}>
        <Text variant="sm" className={styles.sidebarTitle}>Components</Text>
        <Divider />
        <Stack direction="column" gap={1} className={styles.sidebarNav}>
          {components.map((component) => (
            <Button
              key={component.name}
              variant="ghost"
              size="sm"
              className={`${styles.sidebarItem} ${component.name === active ? styles.sidebarItemActive : ''}`}
              onClick={() => setActive(component.name)}
            >
              {component.title}
            </Button>
          ))}
        </Stack>
      </aside>

      <main className={styles.stage}>
        {selected && (
          <>
            <header className={styles.stageHeader}>
              <Title variant="h2" className={styles.stageTitle}>{selected.title}</Title>
              {selected.description && <Text variant="sm" className={styles.stageDesc}>{selected.description}</Text>}
            </header>

            <Stack direction="row" gap={4} className={styles.workspace}>
              <Stack direction="column" gap={3} className={styles.controls}>
                <Text variant="sm" className={styles.controlsTitle}>Controls</Text>
                <Divider />
                {selected.controls.map((control) => (
                  <Stack key={control.name} direction="column" gap={1} className={styles.control}>
                    <Text variant="sm" className={styles.controlLabel}>{control.label}</Text>
                    {control.type === 'select' && (
                      <Select
                        value={String(currentValues[control.name])}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update(selected.name, control.name, e.target.value)}
                      >
                        {control.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </Select>
                    )}
                    {control.type === 'boolean' && (
                      <Checkbox
                        checked={Boolean(currentValues[control.name])}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(selected.name, control.name, e.target.checked)}
                        label="Enable"
                      />
                    )}
                    {control.type === 'text' && (
                      <Input
                        type="text"
                        value={String(currentValues[control.name])}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(selected.name, control.name, e.target.value)}
                      />
                    )}
                    {control.type === 'number' && (
                      <Input
                        type="number"
                        value={String(currentValues[control.name])}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(selected.name, control.name, Number(e.target.value))}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>

              <Stack direction="column" gap={3} className={styles.preview}>
                <Stack direction="column" className={styles.demo}>
                  {selected.render(currentValues)}
                </Stack>
                {snippet && (
                  <Stack direction="column" className={styles.codeBlock}>
                    <pre><code>{snippet}</code></pre>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </main>
    </Card>
  );
};

export default Play;
