# React Cupertino UI - Roadmap Checklist

## Status: 🟢 Em Progresso

---

## 1 - Native Components

### 1.1 Migração iOS 18 → iOS 26 (Liquid Glass)

#### Componentes Migrados ✅
- [x] Button (Molecule) - Glass variants implementadas
- [x] Card (Organism) - Glass effect, blur variants
- [x] Dialog (Organism) - Overlay blur, glass panel
- [x] TextField (Molecule) - Glass background, focus states
- [x] Select (UI) - Glass dropdown, keyboard navigation
- [x] Switcher (UI) - Liquid Glass track, solid thumb
- [x] Checkbox (UI) - Glass panel, animated check
- [x] Radio (UI) - Glass outer ring, solid inner
- [x] Slider (UI) - Glass track, gradient progress
- [x] ProgressBar (UI) - Glass track, animated gradient
- [x] Badge (UI) - Glass/solid/outline variants
- [x] Toast (UI) - Glass panel, state variants
- [x] Sidesheet (UI) - Glass panel, overlay blur
- [x] SegmentedControl (UI) - Glass container, animated indicator

### 1.2 Novos Native Components

| Componente | Status | Localização |
|------------|--------|-------------|
| NavigationBar | ✅ Completo | `packages/organisms/NavigationBar/` |
| TabBar | ✅ Completo | `packages/organisms/TabBar/` |
| SearchBar | ✅ Completo | `packages/molecules/SearchBar/` |
| ActionSheet | ✅ Completo | `packages/organisms/ActionSheet/` |
| DatePicker | ✅ Completo | `packages/molecules/DatePicker/` |
| Stepper | ✅ Completo | `packages/molecules/Stepper/` |
| PageControl | ✅ Completo | `packages/atoms/PageControl/` |
| ContextMenu | ✅ Completo | `packages/molecules/ContextMenu/` |
| Popover | ✅ Completo | `packages/organisms/Popover/` |
| BottomSheet | ✅ Completo | `packages/organisms/BottomSheet/` |

---

## 2 - AI Prompts (Apple Intelligence)

| Componente | Status | Localização |
|------------|--------|-------------|
| SiriWaveform | ✅ Completo | `packages/atoms/SiriWaveform/` |
| AIPromptInput | ✅ Completo | `packages/molecules/AIPromptInput/` |
| AIResponseBubble | ✅ Completo | `packages/molecules/AIResponseBubble/` |
| VoiceIndicator | ✅ Completo | `packages/atoms/VoiceIndicator/` |
| AILoadingState | ✅ Completo | `packages/atoms/AILoadingState/` |
| SuggestionChip | ✅ Completo | `packages/atoms/SuggestionChip/` |
| IntelligenceGlow | ✅ Completo | `packages/atoms/IntelligenceGlow/` |
| AIConversation | ✅ Completo | `packages/organisms/AIConversation/` |

---

## 3 - iOS Templates

| Template | Status | Localização |
|----------|--------|-------------|
| ListTemplate | ✅ Completo | `packages/templates/ListTemplate/` |
| DetailTemplate | ✅ Completo | `packages/templates/DetailTemplate/` |
| SettingsTemplate | ✅ Completo | `packages/templates/SettingsTemplate/` |
| ProfileTemplate | ✅ Completo | `packages/templates/ProfileTemplate/` |
| OnboardingTemplate | ✅ Completo | `packages/templates/OnboardingTemplate/` |
| AuthTemplate | ✅ Completo | `packages/templates/AuthTemplate/` |
| SplitViewTemplate | ✅ Completo | `packages/templates/SplitViewTemplate/` |
| MasterDetailTemplate | ✅ Completo | `packages/templates/MasterDetailTemplate/` |
| EmptyStateTemplate | ✅ Completo | `packages/templates/EmptyStateTemplate/` |

---

## 4 - iOS UI Kits

### 4.1 MessagesKit
| Componente | Status | Localização |
|------------|--------|-------------|
| ConversationList | ✅ Completo | `packages/organisms/ConversationList/` |
| ReactionPicker | ✅ Completo | `packages/molecules/ReactionPicker/` |
| MessageBubble | ⏳ Pendente | - |
| MessageInput | ⏳ Pendente | - |
| ConversationHeader | ⏳ Pendente | - |
| TypingIndicator | ⏳ Pendente | - |
| ReadReceipt | ⏳ Pendente | - |
| MediaPreview | ⏳ Pendente | - |
| LinkPreview | ⏳ Pendente | - |
| AudioMessage | ⏳ Pendente | - |

### 4.2 MusicKit
| Componente | Status | Localização |
|------------|--------|-------------|
| MiniPlayer | ✅ Completo | `packages/organisms/MiniPlayer/` |
| FullPlayerTemplate | ✅ Completo | `packages/templates/FullPlayerTemplate/` |
| LyricsView | ✅ Completo | `packages/organisms/LyricsView/` |
| TrackList | ⏳ Pendente | - |
| AlbumCover | ⏳ Pendente | - |
| ProgressSlider | ⏳ Pendente | - |
| VolumeControl | ⏳ Pendente | - |
| PlaybackControls | ⏳ Pendente | - |
| NowPlayingBar | ⏳ Pendente | - |
| QueueList | ⏳ Pendente | - |

### 4.3 MailKit
| Componente | Status | Localização |
|------------|--------|-------------|
| MailDetailTemplate | ✅ Completo | `packages/templates/MailDetailTemplate/` |
| MailList | ⏳ Pendente | - |
| MailItem | ⏳ Pendente | - |
| ComposeEmail | ⏳ Pendente | - |
| RecipientField | ⏳ Pendente | - |
| AttachmentPicker | ⏳ Pendente | - |
| MailToolbar | ⏳ Pendente | - |
| FolderList | ⏳ Pendente | - |

### 4.4 Outros Kits (Pendentes)
- [ ] MapsKit
- [ ] PhotosKit
- [ ] CalendarKit
- [ ] HealthKit UI
- [ ] WalletKit

---

## 5 - Componentes Adicionais Sugeridos

| Componente | Status | Descrição |
|------------|--------|-----------|
| SpotlightSearch | ✅ Completo | Busca estilo Spotlight iOS |
| Tooltip | ✅ Completo | `packages/ui/Tooltip/` |
| Breadcrumb | ✅ Completo | `packages/ui/Breadcrumb/` |
| Accordion | ✅ Completo | `packages/ui/Accordion/` |
| Tabs | ✅ Completo | `packages/ui/Tabs/` |
| Carousel | ✅ Completo | `packages/ui/Carousel/` |
| Timeline | ✅ Completo | `packages/ui/Timeline/` |
| Rating | ✅ Completo | `packages/ui/Rating/` |
| NotificationBanner | ✅ Completo | `packages/ui/NotificationBanner/` |
| CommandPalette | ✅ Completo | `packages/ui/CommandPalette/` |
| SegmentedTabs | ✅ Completo | `packages/ui/SegmentedTabs/` |
| MediaTransport | ✅ Completo | `packages/ui/MediaTransport/` |
| PhotosGrid | ✅ Completo | `packages/ui/PhotosGrid/` |
| AlbumCover | ✅ Completo | `packages/ui/AlbumCover/` |
| PlaybackQueue | ✅ Completo | `packages/ui/PlaybackQueue/` |
| MiniNotification | ✅ Completo | `packages/ui/MiniNotification/` |

---

## 6 - Infraestrutura

- [x] Design Tokens Liquid Glass (`packages/shared/lib/constants/tokens/glass/`)
- [x] Mixins SCSS Glass (`src/styles/mixins/_glass.scss`)
- [x] Animações Spring configuradas
- [x] Build sistema configurado
- [x] Testes passando (160/160)
- [x] Lint passando
- [ ] GitHub Actions para CI/CD
- [ ] Publicação NPM configurada
- [ ] Documentação Storybook completa

---

## Última Atualização
Data: 2026-01-01
Testes: 160/160 ✅
Lint: Passando ✅
Build: Passando ✅

---

## Atualizações Recentes (Sessão Atual)

- [x] **TabBar (Organism)**: Rebuilt with keyboard navigation, haptic feedback toggle, floating mode, tone props and Joins indicator. Files: `packages/organisms/TabBar`, stories + tests updated.
- [x] **Switcher (UI)**: Added haptic feedback option, state labels, alignment props, optional icons and improved glass styling. Files: `packages/ui/Switcher`, stories + tests updated.
- [x] **QuickAction (Molecule)**: New quick action tile for landing demos and AI workflows. Files: `packages/molecules/QuickAction`, stories/tests in place.
- [x] **AI Knowledge Base**: Populated `AI/agents`, `AI/workflows`, `AI/tasks`, `AI/prompts` plus `mcp-samples.json`; rule files now reference these resources.
- [x] **Home Landing Page**: `src/pages/Home` showcases Button, SpotlightSearch, QuickAction, ListTemplate and AI primitives with SEO metadata. `App.tsx` now renders this page.
- [x] **Tabs (UI)**: Liquid Glass tab system with glass/soft/underline variants, keyboard navigation, icon badges, and integrated stories/tests at `packages/ui/Tabs/`.
- [x] **Timeline (UI)**: Vertical Liquid Glass timeline with connectors, status-indicator glow, interactive mode, stories and tests in `packages/ui/Timeline/`.
- [x] **Tooltip (UI)**: Radix-based Liquid Glass tooltip with tones, motion presets, new package metadata, stories and tests in `packages/ui/Tooltip/`.
- [x] **Rating (UI)**: New Liquid Glass star rating component with half-step support, stories and tests in `packages/ui/Rating/`.
- [x] **Breadcrumb (UI)**: Cupertino-style breadcrumb trail with overflow handling and glass styling in `packages/ui/Breadcrumb/`.
- [x] **Carousel (UI)**: New Liquid Glass carousel with autoplay, controls, and indicators in `packages/ui/Carousel/`.
- [x] **Accordion (UI)**: Liquid Glass accordion supporting single/multiple expansion at `packages/ui/Accordion/`.
- [x] **NotificationBanner (UI)**: Cupertino notification ribbon with tones, actions, and dismiss/auto-hide in `packages/ui/NotificationBanner/`.
- [x] **CommandPalette (UI)**: Spotlight-inspired command overlay with search, keyboard navigation, and stories/tests at `packages/ui/CommandPalette/`.
- [x] **SegmentedTabs (UI)**: Segmented control with tab content in `packages/ui/SegmentedTabs/`.
- [x] **MediaTransport (UI)**: Liquid Glass media controls with play/pause/skip and loading state in `packages/ui/MediaTransport/`.
- [x] **PhotosGrid (UI)**: Flexible Photos app-inspired grid in `packages/ui/PhotosGrid/`.
- [x] **AlbumCover (UI)**: Liquid Glass album art card with play overlay in `packages/ui/AlbumCover/`.
- [x] **PlaybackQueue (UI)**: Music queue list component at `packages/ui/PlaybackQueue/`.
- [x] **MiniNotification (UI)**: Compact banner for inline alerts in `packages/ui/MiniNotification/`.
