# @react-cupertino-ui/all

> Meta-package that installs **all** @react-cupertino-ui components at once.

## Installation

```bash
npm install @react-cupertino-ui/all
# or
pnpm add @react-cupertino-ui/all
# or
yarn add @react-cupertino-ui/all
```

## Usage

Import any component directly from the meta-package:

```tsx
import { 
  Button, 
  Card, 
  Dialog, 
  AIConversation,
  NavigationBar 
} from '@react-cupertino-ui/all';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Included Packages (101 components)

This meta-package includes all components from the @react-cupertino-ui library:

### Atoms
- ai-loading-state, intelligence-glow, page-control, read-receipt
- siri-status-indicator, siri-waveform, suggestion-chip
- typing-indicator, voice-indicator

### UI Components
- accordion, action-sheet, album-cover, avatar, badge
- bottom-sheet, breadcrumb, button, calendar-heatmap, caption
- card, carousel, checkbox, color-tokens-viewer, command-palette
- dialog, headline, list, lyrics-view, navigation-bar
- notification-banner, now-playing-bar, paragraph, photos-grid
- popover, progress-bar, radio, rating, search-bar
- segmented-control, segmented-tabs, select, sidesheet
- siri-shortcut-chip, skeleton, slider, stepper, swipe-actions
- switcher, tab-bar, tabs, text-field, timeline
- title, toast, tooltip, track-list, volume-control

### Molecules
- ai-prompt-input, ai-response-bubble, alert, audio-message
- context-menu, date-picker, link-preview, media-preview
- message-bubble, message-input, picker, playback-controls
- progress-slider, quick-action, reaction-picker
- suggestion-bar, voice-command-bar

### Organisms
- ai-action-list, ai-conversation, ai-insight-card
- ai-recommender-grid, conversation-header, conversation-list
- mail-composer, mail-list, maps-poi-card, media-session-card
- media-transport, mini-notification, mini-player, playback-queue

### Templates
- auth-template, detail-template, empty-state-template
- full-player-template, landing-page-template, list-template
- mail-detail-template, master-detail-template, onboarding-template
- profile-template, settings-template, split-view-template

## License

MIT © Anderson Lima
