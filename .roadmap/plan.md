# React Cupertino UI - Plano de Implementação

## Estrutura Baseada no Figma

Este plano segue a organização das pastas do Figma e implementa cada componente seguindo **Atomic Design** com migração para **iOS 26 Liquid Glass**.

---

# 1 - Native Components

## 1.1 Migração iOS 18 → iOS 26 (Liquid Glass)

### Componentes Existentes para Migrar

#### 1.1.1 Button (Molecule)
**Arquivo:** `src/components/molecules/Button/`

**Mudanças Liquid Glass:**
```scss
.react-cupertino-ui-button {
  // Liquid Glass base
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  // Refraction effect
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%
    );
    border-radius: inherit;
    pointer-events: none;
  }
}
```

**Variantes:**
- `glass` - Padrão Liquid Glass
- `solid` - Cor sólida com glass border
- `outline` - Apenas borda glass
- `ghost` - Transparente com hover glass

**Tarefas:**
- [ ] Criar token `--glass-*` no design system
- [ ] Implementar backdrop-filter com fallback
- [ ] Adicionar animação de pressão (spring physics)
- [ ] Atualizar variantes existentes
- [ ] Criar stories para todas variantes
- [ ] Testes de regressão visual

---

#### 1.1.2 Card (Organism)
**Arquivo:** `src/components/organisms/Card/`

**Mudanças Liquid Glass:**
```scss
.react-cupertino-ui-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

**Novas Props:**
```typescript
interface CardProps {
  glass?: boolean;        // Ativa Liquid Glass
  blur?: 'sm' | 'md' | 'lg';
  intensity?: number;     // 0-1 opacidade do glass
}
```

**Tarefas:**
- [x] Implementar glass effect
- [x] Adicionar variantes de blur
- [x] Criar animação de hover
- [x] Suporte a imagem de fundo com glass overlay
- [x] Testes e documentação

---

#### 1.1.3 Dialog (Organism)
**Arquivo:** `src/components/organisms/Dialog/`

**Mudanças Liquid Glass:**
- Overlay com blur pesado
- Conteúdo com glass panel
- Animação de entrada com spring
- Botões glass integrados

**Tarefas:**
- [x] Atualizar overlay para usar blur
- [x] Glass panel no conteúdo
- [x] Animações de entrada/saída
- [x] Integração com novos botões glass

---

#### 1.1.4 TextField (Molecule)
**Arquivo:** `src/components/molecules/TextField/`

**Mudanças Liquid Glass:**
```scss
.react-cupertino-ui-textfield {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:focus {
    background: rgba(255, 255, 255, 0.7);
    border-color: var(--color-blue);
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2);
  }
}
```

**Tarefas:**
- [x] Glass background
- [x] Focus ring atualizado
- [x] Label flutuante com animação
- [x] Estados de erro/sucesso glass

---

#### 1.1.5 Outros Componentes Existentes

| Componente | Prioridade | Tarefas Principais |
|------------|------------|-------------------|
| Select | Alta | Glass dropdown, animação de abertura |
| Switcher | Alta | Track glass, thumb sólido |
| Checkbox | Alta | Glass border, checkmark animado |
| Radio | Alta | Glass outer, solid inner |
| Slider | Média | Track glass, thumb glass |
| ProgressBar | Média | Track glass, fill gradiente |
| Badge | Média | Glass background |
| Avatar | Baixa | Glass border ring |
| Toast | Alta | Glass panel, blur background |
| Sidesheet | Alta | Glass panel, overlay blur |
| SegmentedControl | Alta | Glass container, solid selection |

##### Select (UI)
- [x] Revamp do trigger com painel Liquid Glass
- [x] Dropdown customizado com animação de abertura
- [x] Navegação via teclado e foco acessível
- [x] Atualização das stories e testes unitários

##### Switcher (UI)
- [x] Estrutura com suporte a label/descrição
- [x] Track Liquid Glass + thumb sólido com animação
- [x] Navegação acessível e Radix iOS-like
- [x] Stories e testes cobrindo tamanhos/estados

##### Checkbox (UI)
- [x] Caixa com painel Liquid Glass + variantes solid/outline
- [x] Check animado e suporte a helper/error
- [x] Stories cobrindo estados, tamanhos e variantes
- [x] Testes de renderização e interação

##### Radio (UI)
- [x] Anel exterior Liquid Glass e ponto sólido animado
- [x] API com variantes, helper/error e tamanhos
- [x] Stories cobrindo estados e variantes
- [x] Testes garantindo interação básica

##### Slider (UI)
- [x] Trilha Liquid Glass com progresso gradiente
- [x] Thumb sólido, estados de foco/erro e variantes
- [x] Stories cobrindo variantes/tamanhos/erros
- [x] Testes com label, valor e mudança

##### ProgressBar (UI)
- [x] Trilha Liquid Glass com gradiente animado
- [x] Mensagens de helper/erro e variantes de estado
- [x] Stories cobrindo tamanhos, variantes, animação
- [x] Testes para label, helper e atributos ARIA

##### Badge (UI)
- [x] Variantes glass/solid/outline/status
- [x] Suporte a ícones e tamanhos pill
- [x] Stories cobrindo estados e combinações
- [x] Testes mínimos para conteúdo/ícones

##### Toast (UI)
- [x] Container com painel Liquid Glass e variantes de estado
- [x] Stories mostrando posições, ícones e vidro opcional
- [x] Testes básicos para conteúdo e fechamento

##### Sidesheet (UI)
- [x] Overlay com blur e painel Liquid Glass
- [x] Estrutura Radix mantendo animações existentes
- [x] Build validado após as alterações

##### SegmentedControl (UI)
- [x] Container com painel Liquid Glass e indicador animado
- [x] Variantes glass/solid/outline e tamanhos atualizados
- [x] Testes com modo controlado e opções desabilitadas
- [x] Stories já existentes cobrem tamanhos/icones/full width

---

## 1.2 Novos Native Components

### 1.2.1 NavigationBar (Organism)
**Arquivo:** `src/components/organisms/NavigationBar/`

```typescript
interface NavigationBarProps {
  title: string;
  subtitle?: string;
  leftItems?: React.ReactNode[];
  rightItems?: React.ReactNode[];
  large?: boolean;           // Large title style
  transparent?: boolean;     // Glass effect
  scrolled?: boolean;        // Compact on scroll
  backButton?: boolean;
  onBack?: () => void;
}
```

**Implementação:**
```tsx
const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(
  ({ title, large, transparent, scrolled, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "react-cupertino-ui-navigation-bar",
          large && "large-title",
          transparent && "transparent",
          scrolled && "scrolled"
        )}
      >
        <div className="nav-content">
          {/* Left items */}
          {/* Title */}
          {/* Right items */}
        </div>
      </nav>
    );
  }
);
```

**SCSS:**
```scss
.react-cupertino-ui-navigation-bar {
  position: sticky;
  top: 0;
  z-index: 100;

  &.transparent {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(40px) saturate(180%);
  }

  &.scrolled {
    .large-title {
      transform: scale(0.7);
      opacity: 0;
    }
    .compact-title {
      opacity: 1;
    }
  }
}
```

**Tarefas:**
- [ ] Estrutura base do componente
- [ ] Large title com animação de scroll
- [ ] Glass effect quando transparent
- [ ] Transição para compact title
- [ ] Integração com back button
- [ ] Stories e testes

---

### 1.2.2 TabBar (Organism)
**Arquivo:** `src/components/organisms/TabBar/`

```typescript
interface TabBarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
}

interface TabBarProps {
  items: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  glass?: boolean;
}
```

**Tarefas:**
- [ ] Layout fixo inferior
- [ ] Ícones com labels
- [ ] Animação de seleção
- [ ] Badge support
- [ ] Glass background
- [ ] Haptic feedback indication

---

### 1.2.3 SearchBar (Molecule)
**Arquivo:** `src/components/molecules/SearchBar/`

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  suggestions?: string[];
}
```

**Tarefas:**
- [ ] Input com ícone de busca
- [ ] Botão cancelar com animação
- [ ] Glass background
- [ ] Sugestões dropdown
- [ ] Voice search button (opcional)

---

### 1.2.4 ActionSheet (Organism)
**Arquivo:** `src/components/organisms/ActionSheet/`

```typescript
interface ActionSheetAction {
  label: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: ActionSheetAction[];
  cancelLabel?: string;
}
```

**Tarefas:**
- [ ] Sheet deslizante de baixo
- [ ] Glass panel
- [ ] Ações com ícones
- [ ] Botão cancelar separado
- [ ] Animação spring
- [ ] Gesture para fechar

---

### 1.2.5 DatePicker (Molecule)
**Arquivo:** `src/components/molecules/DatePicker/`

```typescript
interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode: 'date' | 'time' | 'datetime';
  min?: Date;
  max?: Date;
  locale?: string;
  style?: 'wheel' | 'calendar' | 'compact';
}
```

**Tarefas:**
- [ ] Wheel picker iOS style
- [ ] Calendar view alternativo
- [ ] Compact inline mode
- [ ] Glass container
- [ ] Animações de scroll

---

### 1.2.6 Stepper (Molecule)
**Arquivo:** `src/components/molecules/Stepper/`

```typescript
interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}
```

**Tarefas:**
- [x] Botões +/- glass
- [x] Valor central
- [ ] Long press para incremento rápido
- [ ] Animação de valor

---

### 1.2.7 PageControl (Atom)
**Arquivo:** `src/components/atoms/PageControl/`

```typescript
interface PageControlProps {
  total: number;
  current: number;
  onChange?: (index: number) => void;
  variant?: 'dots' | 'pills';
}
```

**Tarefas:**
- [ ] Dots indicadores
- [ ] Animação de transição
- [ ] Click para navegar
- [ ] Variante pills

---

### 1.2.8 ContextMenu (Molecule)
**Arquivo:** `src/components/molecules/ContextMenu/`

```typescript
interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  submenu?: ContextMenuItem[];
  onSelect: () => void;
}

interface ContextMenuProps {
  trigger: React.ReactNode;
  items: ContextMenuItem[];
}
```

**Tarefas:**
- [ ] Menu flutuante glass
- [ ] Suporte a submenus
- [ ] Ícones e shortcuts
- [ ] Preview na trigger (como iOS)
- [ ] Animação de abertura

---

### 1.2.9 Popover (Organism)
**Arquivo:** `src/components/organisms/Popover/`

```typescript
interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
  glass?: boolean;
}
```

**Tarefas:**
- [ ] Posicionamento inteligente
- [ ] Arrow apontando para trigger
- [ ] Glass background
- [ ] Animação de entrada

---

### 1.2.10 BottomSheet (Organism)
**Arquivo:** `src/components/organisms/BottomSheet/`

```typescript
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];     // [0.25, 0.5, 0.9]
  initialSnap?: number;
  handle?: boolean;
  glass?: boolean;
}
```

**Tarefas:**
- [ ] Sheet com snap points
- [ ] Gesture para arrastar
- [ ] Handle indicator
- [ ] Glass background
- [ ] Animações spring

---

# 2 - AI Prompts

## Componentes Apple Intelligence

### 2.1 SiriWaveform (Atom)
**Arquivo:** `src/components/atoms/SiriWaveform/`

```typescript
interface SiriWaveformProps {
  active: boolean;
  amplitude?: number;
  color?: 'default' | 'multicolor';
  size?: 'sm' | 'md' | 'lg';
}
```

**Implementação:**
- Canvas ou SVG animado
- Gradiente multicolor
- Resposta a amplitude de áudio
- Animação fluida 60fps

**Tarefas:**
- [ ] Implementar waveform base
- [ ] Animação com requestAnimationFrame
- [ ] Variantes de cor
- [ ] Integração com Web Audio API

---

### 2.2 AIPromptInput (Molecule)
**Arquivo:** `src/components/molecules/AIPromptInput/`

```typescript
interface AIPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  suggestions?: string[];
  attachments?: boolean;
}
```

**Tarefas:**
- [ ] Input expansível
- [ ] Botão de envio animado
- [ ] Sugestões rápidas
- [ ] Suporte a anexos
- [ ] Estado de loading

---

### 2.3 AIResponseBubble (Molecule)
**Arquivo:** `src/components/molecules/AIResponseBubble/`

```typescript
interface AIResponseBubbleProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
  status?: 'sending' | 'sent' | 'error';
  typing?: boolean;
}
```

**Tarefas:**
- [ ] Bubble com glass effect
- [ ] Animação de typing
- [ ] Markdown rendering
- [ ] Timestamps
- [ ] Status indicators

---

### 2.4 VoiceIndicator (Atom)
**Arquivo:** `src/components/atoms/VoiceIndicator/`

```typescript
interface VoiceIndicatorProps {
  listening: boolean;
  volume?: number;      // 0-1
}
```

**Tarefas:**
- [ ] Círculo pulsante
- [ ] Resposta a volume
- [ ] Cores Apple Intelligence

---

### 2.5 AILoadingState (Atom)
**Arquivo:** `src/components/atoms/AILoadingState/`

```typescript
interface AILoadingStateProps {
  variant: 'thinking' | 'generating' | 'searching';
  message?: string;
}
```

**Tarefas:**
- [ ] Animações distintas por estado
- [ ] Mensagem de contexto
- [ ] Cores gradiente AI

---

### 2.6 SuggestionChip (Atom)
**Arquivo:** `src/components/atoms/SuggestionChip/`

```typescript
interface SuggestionChipProps {
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  selected?: boolean;
}
```

**Tarefas:**
- [ ] Chip com glass effect
- [ ] Ícone opcional
- [ ] Animação de seleção

---

### 2.7 IntelligenceGlow (Atom)
**Arquivo:** `src/components/atoms/IntelligenceGlow/`

```typescript
interface IntelligenceGlowProps {
  active: boolean;
  intensity?: number;
  children: React.ReactNode;
}
```

**Implementação:**
```scss
.intelligence-glow {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: linear-gradient(
      135deg,
      #FF6B9D,
      #C44FE2,
      #7B68EE,
      #4F94E2,
      #4FE2C4
    );
    background-size: 300% 300%;
    border-radius: inherit;
    filter: blur(12px);
    opacity: 0;
    animation: glow-rotate 3s ease infinite;
    transition: opacity 0.3s ease;
  }

  &.active::before {
    opacity: 0.8;
  }
}

@keyframes glow-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Tarefas:**
- [ ] Glow gradiente animado
- [ ] Wrapper component
- [ ] Intensidade controlável

---

### 2.8 AIConversation (Organism)
**Arquivo:** `src/components/organisms/AIConversation/`

```typescript
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIConversationProps {
  messages: Message[];
  onSend: (message: string) => void;
  loading?: boolean;
  suggestions?: string[];
}
```

**Tarefas:**
- [ ] Lista de mensagens
- [ ] Auto-scroll
- [ ] Input integrado
- [ ] Sugestões flutuantes
- [ ] Estados de loading

---

# 3 - IOS Templates

## 3.1 ListTemplate
**Arquivo:** `src/components/templates/ListTemplate/`

```typescript
interface ListTemplateProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  onItemPress?: (item: any) => void;
  searchable?: boolean;
  grouped?: boolean;
  refreshable?: boolean;
  onRefresh?: () => Promise<void>;
}
```

**Estrutura:**
```
┌─────────────────────────┐
│    Navigation Bar       │
├─────────────────────────┤
│    Search Bar           │
├─────────────────────────┤
│                         │
│    List Items           │
│    (grouped/plain)      │
│                         │
│                         │
└─────────────────────────┘
```

**Tarefas:**
- [ ] NavigationBar integrada
- [ ] SearchBar opcional
- [ ] Grouped sections
- [ ] Pull to refresh
- [ ] Empty state

---

## 3.2 DetailTemplate
**Arquivo:** `src/components/templates/DetailTemplate/`

```typescript
interface DetailTemplateProps {
  title: string;
  subtitle?: string;
  image?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  backButton?: boolean;
  onBack?: () => void;
}
```

**Estrutura:**
```
┌─────────────────────────┐
│    Navigation Bar       │
├─────────────────────────┤
│                         │
│    Hero Image/Header    │
│                         │
├─────────────────────────┤
│                         │
│    Content              │
│                         │
├─────────────────────────┤
│    Actions              │
└─────────────────────────┘
```

**Tarefas:**
- [ ] Hero image com parallax
- [ ] Large title collapsing
- [ ] Action buttons
- [ ] Share/favorite icons

---

## 3.3 SettingsTemplate
**Arquivo:** `src/components/templates/SettingsTemplate/`

```typescript
interface SettingsGroup {
  title?: string;
  footer?: string;
  items: SettingsItem[];
}

interface SettingsItem {
  type: 'navigation' | 'toggle' | 'select' | 'button';
  label: string;
  icon?: React.ReactNode;
  value?: any;
  onChange?: (value: any) => void;
}

interface SettingsTemplateProps {
  title: string;
  groups: SettingsGroup[];
}
```

**Tarefas:**
- [ ] Grupos com headers/footers
- [ ] Itens de navegação
- [ ] Toggles inline
- [ ] Select inline
- [ ] Glass cards

---

## 3.4 ProfileTemplate
**Arquivo:** `src/components/templates/ProfileTemplate/`

```typescript
interface ProfileTemplateProps {
  avatar: string;
  name: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}
```

**Tarefas:**
- [ ] Avatar grande
- [ ] Stats row
- [ ] Action buttons
- [ ] Content sections

---

## 3.5 OnboardingTemplate
**Arquivo:** `src/components/templates/OnboardingTemplate/`

```typescript
interface OnboardingStep {
  image: string;
  title: string;
  description: string;
}

interface OnboardingTemplateProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
}
```

**Tarefas:**
- [ ] Carousel de passos
- [ ] PageControl
- [ ] Botões next/skip
- [ ] Animações de transição

---

## 3.6 AuthTemplate
**Arquivo:** `src/components/templates/AuthTemplate/`

```typescript
interface AuthTemplateProps {
  variant: 'login' | 'register' | 'forgot';
  logo?: React.ReactNode;
  onSubmit: (data: any) => void;
  onSocialLogin?: (provider: string) => void;
  onSwitch?: () => void;
}
```

**Tarefas:**
- [ ] Logo/branding
- [ ] Form fields
- [ ] Social login buttons
- [ ] Switch login/register link

---

## 3.7 SplitViewTemplate (iPad)
**Arquivo:** `src/components/templates/SplitViewTemplate/`

```typescript
interface SplitViewTemplateProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  sidebarWidth?: number;
  collapsible?: boolean;
}
```

**Tarefas:**
- [ ] Sidebar resizable
- [ ] Collapse em mobile
- [ ] Divider draggable

---

## 3.8 EmptyStateTemplate
**Arquivo:** `src/components/templates/EmptyStateTemplate/`

```typescript
interface EmptyStateTemplateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}
```

**Tarefas:**
- [ ] Ícone grande
- [ ] Texto centralizado
- [ ] Botão de ação

---

# 4 - IOS UI Kits

## 4.1 MessagesKit
**Pasta:** `src/components/kits/messages/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MessageBubble | Molecule | Bolha de mensagem |
| MessageInput | Molecule | Input com mídia |
| ConversationList | Organism | Lista de conversas |
| ConversationHeader | Molecule | Header com avatar |
| ReactionPicker | Molecule | Picker de reações |
| TypingIndicator | Atom | Indicador "digitando" |
| ReadReceipt | Atom | Confirmação de leitura |
| MediaPreview | Molecule | Preview de mídia |
| LinkPreview | Molecule | Preview de links |
| AudioMessage | Molecule | Mensagem de áudio |

---

## 4.2 MapsKit
**Pasta:** `src/components/kits/maps/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MapCard | Organism | Card com mapa |
| LocationPin | Atom | Pin de localização |
| DirectionsPanel | Organism | Painel de direções |
| SearchLocation | Molecule | Busca de local |
| PlaceDetails | Organism | Detalhes do lugar |
| RoutePreview | Molecule | Preview de rota |

---

## 4.3 MusicKit
**Pasta:** `src/components/kits/music/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MiniPlayer | Organism | Player compacto |
| FullPlayer | Template | Player tela cheia |
| TrackList | Organism | Lista de músicas |
| AlbumCover | Molecule | Capa do álbum |
| ProgressSlider | Molecule | Slider de progresso |
| VolumeControl | Molecule | Controle de volume |
| PlaybackControls | Molecule | Play/pause/skip |
| LyricsView | Organism | Visualização de letras |
| NowPlayingBar | Organism | Barra "tocando agora" |
| QueueList | Organism | Fila de reprodução |

---

## 4.4 PhotosKit
**Pasta:** `src/components/kits/photos/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| PhotoGrid | Organism | Grid de fotos |
| PhotoViewer | Template | Visualizador full |
| AlbumCover | Molecule | Capa de álbum |
| SelectionToolbar | Molecule | Toolbar de seleção |
| ShareSheet | Organism | Sheet de compartilhar |
| EditToolbar | Molecule | Ferramentas de edição |
| MemoryCard | Organism | Card de memória |

---

## 4.5 MailKit
**Pasta:** `src/components/kits/mail/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MailList | Organism | Lista de emails |
| MailItem | Molecule | Item de email |
| ComposeEmail | Template | Composição de email |
| RecipientField | Molecule | Campo de destinatários |
| AttachmentPicker | Molecule | Seletor de anexos |
| MailToolbar | Molecule | Toolbar de email |
| FolderList | Organism | Lista de pastas |
| MailDetail | Template | Detalhes do email |

---

## 4.6 CalendarKit
**Pasta:** `src/components/kits/calendar/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MonthView | Organism | Visualização mensal |
| WeekView | Organism | Visualização semanal |
| DayView | Organism | Visualização diária |
| EventCard | Molecule | Card de evento |
| EventDetail | Template | Detalhes do evento |
| EventForm | Template | Formulário de evento |
| MiniCalendar | Molecule | Calendário compacto |
| TimeSlotPicker | Molecule | Seletor de horário |
| CalendarHeader | Molecule | Header com navegação |

---

## 4.7 HealthKit UI
**Pasta:** `src/components/kits/health/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| MetricCard | Molecule | Card de métrica |
| RingProgress | Atom | Anel de progresso |
| TrendChart | Organism | Gráfico de tendência |
| HealthSummary | Organism | Resumo de saúde |
| ActivityRings | Molecule | Anéis de atividade |
| HeartRateGraph | Organism | Gráfico de batimentos |
| SleepChart | Organism | Gráfico de sono |
| StepsCounter | Molecule | Contador de passos |

---

## 4.8 WalletKit
**Pasta:** `src/components/kits/wallet/`

### Componentes:
| Componente | Tipo | Descrição |
|------------|------|-----------|
| WalletCard | Molecule | Card de cartão/pass |
| CardStack | Organism | Stack de cards |
| TransactionList | Organism | Lista de transações |
| TransactionItem | Molecule | Item de transação |
| PaymentSheet | Organism | Sheet de pagamento |
| BalanceDisplay | Molecule | Display de saldo |
| QRCode | Atom | Código QR |
| Barcode | Atom | Código de barras |

---

# Outras Implementações

## Design Tokens Liquid Glass

### Arquivo: `src/lib/constants/tokens/glass.ts`

```typescript
export const glassTokens = {
  blur: {
    sm: '10px',
    md: '20px',
    lg: '40px',
    xl: '60px',
  },
  saturation: {
    subtle: '120%',
    normal: '180%',
    intense: '200%',
  },
  opacity: {
    light: 0.5,
    normal: 0.7,
    heavy: 0.85,
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.1)',
    normal: 'rgba(255, 255, 255, 0.18)',
    strong: 'rgba(255, 255, 255, 0.3)',
  },
  shadow: {
    sm: '0 4px 16px rgba(0, 0, 0, 0.08)',
    md: '0 8px 32px rgba(0, 0, 0, 0.12)',
    lg: '0 12px 48px rgba(0, 0, 0, 0.16)',
  },
};
```

---

## Utilitário Glass Mixin

### Arquivo: `src/styles/mixins/_glass.scss`

```scss
@mixin glass($blur: 40px, $opacity: 0.7, $saturation: 180%) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur) saturate($saturation);
  -webkit-backdrop-filter: blur($blur) saturate($saturation);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

@mixin glass-dark($blur: 40px, $opacity: 0.3, $saturation: 180%) {
  background: rgba(0, 0, 0, $opacity);
  backdrop-filter: blur($blur) saturate($saturation);
  -webkit-backdrop-filter: blur($blur) saturate($saturation);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
}

@mixin glass-refraction() {
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%
    );
    border-radius: inherit;
    pointer-events: none;
  }
}
```

---

## Animações Spring

### Arquivo: `src/lib/constants/animations.ts`

```typescript
export const springConfig = {
  gentle: {
    tension: 120,
    friction: 14,
  },
  wobbly: {
    tension: 180,
    friction: 12,
  },
  stiff: {
    tension: 210,
    friction: 20,
  },
  slow: {
    tension: 280,
    friction: 60,
  },
};

export const transitions = {
  fast: '150ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  normal: '250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  slow: '400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  spring: '500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};
```

---

## Reorganização de Pastas (Atomic Design)

### Script de Migração

```bash
# Estrutura atual → Nova estrutura
src/components/ui/Button → src/components/molecules/Button
src/components/ui/Card → src/components/organisms/Card
src/components/ui/Badge → src/components/atoms/Badge
# etc.
```

### Nova Estrutura Proposta

```
src/
├── components/
│   ├── atoms/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Skeleton/
│   │   ├── Icon/
│   │   ├── Spinner/
│   │   ├── Divider/
│   │   ├── PageControl/
│   │   └── ...
│   ├── molecules/
│   │   ├── Button/
│   │   ├── TextField/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Switcher/
│   │   ├── Slider/
│   │   ├── Select/
│   │   ├── SearchBar/
│   │   ├── Toast/
│   │   └── ...
│   ├── organisms/
│   │   ├── Card/
│   │   ├── Dialog/
│   │   ├── Sidesheet/
│   │   ├── NavigationBar/
│   │   ├── TabBar/
│   │   ├── ActionSheet/
│   │   ├── List/
│   │   └── ...
│   ├── templates/
│   │   ├── ListTemplate/
│   │   ├── DetailTemplate/
│   │   ├── SettingsTemplate/
│   │   └── ...
│   └── kits/
│       ├── messages/
│       ├── music/
│       ├── photos/
│       └── ...
├── lib/
│   ├── constants/
│   │   ├── themes/
│   │   ├── tokens/
│   │   │   ├── colors/
│   │   │   ├── glass/      # NEW
│   │   │   ├── animations/ # NEW
│   │   │   └── ...
│   └── ...
└── styles/
    └── mixins/
        ├── _glass.scss     # NEW
        ├── _animations.scss # NEW
        └── ...
```

---

## Checklist de Implementação

### Por Componente:
- [ ] Implementação TypeScript
- [ ] Estilos SCSS com Liquid Glass
- [ ] Story Storybook completa
- [ ] Testes unitários
- [ ] Testes de acessibilidade
- [ ] Documentação JSDoc
- [ ] Suporte a temas
- [ ] Responsividade
- [ ] Performance otimizada

### Global:
- [ ] Design tokens Liquid Glass
- [ ] Mixins SCSS
- [ ] Animações spring
- [ ] Hooks customizados (useGlass, useSpring)
- [ ] Provider de tema atualizado
- [ ] Documentação geral
- [ ] Migração guia
- [ ] Changelog
