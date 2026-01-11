# React Cupertino UI - Roadmap

## Visão Geral

Este roadmap define a evolução da biblioteca React Cupertino UI, migrando do iOS 18 para o **iOS 26 (Liquid Glass)** e implementando todos os componentes seguindo o **Atomic Design**.

---

## Estrutura Atomic Design

```
src/components/
├── atoms/           # Componentes básicos indivisíveis
├── molecules/       # Combinação de átomos
├── organisms/       # Seções complexas de UI
├── templates/       # Layouts de página
└── pages/           # Páginas completas
```

---

## iOS 26 - Liquid Glass Design System

### Características Principais
- **Glassmorphism avançado** com blur e transparência
- **Efeitos de refração** que respondem ao conteúdo por trás
- **Animações fluidas** com spring physics
- **Cores adaptativas** baseadas no ambiente
- **Bordas suaves** com gradientes sutis
- **Sombras dinâmicas** que se adaptam ao contexto

### Novos Tokens de Design
```scss
// Liquid Glass Variables
--glass-blur: 40px;
--glass-saturation: 180%;
--glass-opacity: 0.7;
--glass-border: rgba(255, 255, 255, 0.18);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
--glass-refraction: 1.5;
```

---

## Fases de Implementação

### Fase 1: Migração Liquid Glass (Core)
**Prioridade: Alta**

| Componente | Status Atual | Migração |
|------------|--------------|----------|
| Button | iOS 18 | → Liquid Glass |
| Card | Liquid Glass ✅ | Entregue |
| Dialog | Liquid Glass ✅ | Entregue |
| TextField | Liquid Glass ✅ | Entregue |
| Select | Liquid Glass ✅ | Entregue |
| Switcher | Liquid Glass ✅ | Entregue |
| Checkbox | Liquid Glass ✅ | Entregue |
| Radio | Liquid Glass ✅ | Entregue |
| Slider | Liquid Glass ✅ | Entregue |
| ProgressBar | Liquid Glass ✅ | Entregue |
| Toast | Liquid Glass ✅ | Entregue |
### Fase 2: Novos Componentes Nativos
**Prioridade: Alta**

| Componente | Categoria | Descrição |
|------------|-----------|-----------|
| NavigationBar | Organism | Barra de navegação superior ✅ |
| TabBar | Organism | Barra de abas inferior ✅ |
| SearchBar | Molecule | Campo de busca iOS ✅ |
| ActionSheet | Organism | Menu de ações deslizante ✅ |
| Alert | Molecule | Alertas nativos iOS |
| DatePicker | Molecule | Seletor de data/hora ✅ |
| TimePicker | Molecule | Seletor de hora ✅ |
| Picker | Molecule | Seletor wheel style ✅ |
| Stepper | Molecule | Incrementador/decrementador ✅ |
| PageControl | Atom | Indicadores de página ✅ |
| ContextMenu | Molecule | Menu contextual ✅ |
| Popover | Organism | Popover flutuante ✅ |

### Fase 3: Componentes AI/Siri
**Prioridade: Média**

| Componente | Categoria | Descrição |
|------------|-----------|-----------|
| SiriWaveform | Atom | Animação de onda Siri |
| AIPromptInput | Molecule | Input para prompts AI |
| AIResponseBubble | Molecule | Bolha de resposta AI |
| VoiceIndicator | Atom | Indicador de voz ativo |
| AILoadingState | Atom | Estados de carregamento AI |
| SuggestionChip | Atom | Chips de sugestão |
| AIConversation | Organism | Thread de conversa AI |
| IntelligenceGlow | Atom | Efeito glow Apple Intelligence |

### Fase 4: Templates iOS
**Prioridade: Média**

| Template | Tipo | Descrição |
|----------|------|-----------|
| ListTemplate | Template | Lista padrão iOS |
| DetailTemplate | Template | Tela de detalhes |
| SettingsTemplate | Template | Tela de configurações |
| ProfileTemplate | Template | Perfil de usuário |
| OnboardingTemplate | Template | Fluxo de onboarding |
| SplitViewTemplate | Template | iPad split view |
| MasterDetailTemplate | Template | Master-detail layout |
| ModalTemplate | Template | Modal fullscreen |

### Fase 5: UI Kits Completos
**Prioridade: Baixa**

| Kit | Componentes | Descrição |
|-----|-------------|-----------|
| MessagesKit | ~15 | Kit de mensagens iMessage |
| MapsKit | ~10 | Componentes estilo Maps |
| MusicKit | ~12 | Player e controles música |
| PhotosKit | ~8 | Galeria e visualização |
| MailKit | ~10 | Composição de emails |
| CalendarKit | ~12 | Calendário e eventos |
| HealthKit UI | ~10 | Métricas e gráficos saúde |
| WalletKit | ~8 | Cards e transações |

---

## Componentes por Categoria Atomic

### Atoms (Átomos)
Elementos básicos indivisíveis:

```
atoms/
├── Icon/                 # Ícones SF Symbols
├── Text/                 # Tipografia (já existe como Caption, Title, etc.)
├── Badge/                # ✅ Implementado
├── Spinner/              # Indicador de loading
├── Divider/              # Linha divisória
├── Dot/                  # Indicador de status
├── Avatar/               # ✅ Implementado
├── Chip/                 # Tags/chips
├── Thumbnail/            # Miniaturas
├── Indicator/            # Indicadores visuais
├── Skeleton/             # ✅ Implementado
├── PageControl/          # Dots de paginação
├── SiriWaveform/         # Onda Siri
├── VoiceIndicator/       # Indicador de voz
├── IntelligenceGlow/     # Glow AI
└── GlassPane/            # Base Liquid Glass
```

### Molecules (Moléculas)
Combinação de átomos:

```
molecules/
├── Button/               # ✅ Implementado
├── TextField/            # ✅ Implementado
├── Checkbox/             # ✅ Implementado
├── Radio/                # ✅ Implementado
├── Switcher/             # ✅ Implementado
├── Slider/               # ✅ Implementado
├── Select/               # ✅ Implementado
├── ProgressBar/          # ✅ Implementado
├── SearchBar/            # Campo de busca
├── Stepper/              # +/- controle
├── DatePicker/           # Seletor de data
├── TimePicker/           # Seletor de hora
├── ColorPicker/          # Seletor de cor
├── Alert/                # Alertas inline
├── Toast/                # ✅ Implementado
├── Tooltip/              # Dicas contextuais
├── FormField/            # Campo com label/error
├── ListItem/             # Item de lista
├── MenuItem/             # Item de menu
├── AIPromptInput/        # Input para AI
├── AIResponseBubble/     # Resposta AI
├── SuggestionChip/       # Sugestão AI
└── ContextMenu/          # Menu contextual
```

### Organisms (Organismos)
Seções complexas de UI:

```
organisms/
├── Card/                 # ✅ Implementado
├── Dialog/               # ✅ Implementado
├── Sidesheet/            # ✅ Implementado
├── List/                 # ✅ Implementado
├── NavigationBar/        # Barra superior
├── TabBar/               # Barra inferior
├── Toolbar/              # Barra de ferramentas
├── ActionSheet/          # Sheet de ações
├── BottomSheet/          # Sheet inferior
├── Popover/              # Popover flutuante
├── SegmentedControl/     # ✅ Implementado
├── Table/                # Tabela de dados
├── Form/                 # Formulário completo
├── Header/               # Cabeçalho de seção
├── Footer/               # Rodapé
├── Sidebar/              # Barra lateral
├── Accordion/            # Expansível
├── Carousel/             # Carrossel
├── Gallery/              # Galeria de imagens
├── MediaPlayer/          # Player de mídia
├── AIConversation/       # Thread AI
├── CommandPalette/       # Paleta de comandos
└── Notification/         # Centro de notificações
```

### Templates
Layouts de página:

```
templates/
├── ListTemplate/         # Lista com navegação
├── DetailTemplate/       # Tela de detalhes
├── FormTemplate/         # Formulário
├── SettingsTemplate/     # Configurações
├── ProfileTemplate/      # Perfil
├── DashboardTemplate/    # Dashboard
├── OnboardingTemplate/   # Onboarding
├── AuthTemplate/         # Login/Registro
├── SplitViewTemplate/    # Split view iPad
├── MasterDetailTemplate/ # Master-detail
├── ModalTemplate/        # Modal fullscreen
├── EmptyStateTemplate/   # Estado vazio
├── ErrorTemplate/        # Tela de erro
└── LoadingTemplate/      # Carregamento
```

---

## Timeline de Releases

### v2.0.0 - Liquid Glass Core
- Migração de todos os componentes existentes
- Novos tokens de design
- Sistema de temas atualizado
- Documentação Liquid Glass

### v2.1.0 - Native Components
- NavigationBar, TabBar, SearchBar
- ActionSheet, Alert, Popover
- DatePicker, TimePicker, Picker
- Stepper, PageControl

### v2.2.0 - AI Components
- Componentes Apple Intelligence
- Animações Siri
- Estados de AI
- Sugestões inteligentes

### v2.3.0 - Templates
- Templates iOS básicos
- Layouts responsivos
- Variantes iPad/iPhone

### v3.0.0 - UI Kits
- Kits completos de apps
- Componentes especializados
- Exemplos de aplicações

---

## Métricas de Qualidade

### Requisitos por Componente
- [ ] TypeScript strict mode
- [ ] 100% de cobertura de tipos
- [ ] Testes unitários
- [ ] Story Storybook
- [ ] Documentação JSDoc
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] Suporte a temas (light/dark/custom)
- [ ] Responsividade
- [ ] Animações 60fps
- [ ] Bundle size otimizado

### Performance Targets
- First Paint: < 100ms
- Time to Interactive: < 200ms
- Bundle Size (gzip): < 50KB core
- Lighthouse Score: > 95

---

## Contribuição

### Prioridade de Implementação
1. 🔴 **Crítico** - Componentes core usados em toda app
2. 🟠 **Alto** - Componentes frequentemente usados
3. 🟡 **Médio** - Componentes específicos de features
4. 🟢 **Baixo** - Componentes especializados/opcionais

### Processo de Desenvolvimento
1. Criar issue com especificação
2. Design review com Figma
3. Implementação seguindo patterns
4. Code review
5. Testes e documentação
6. Merge e release
