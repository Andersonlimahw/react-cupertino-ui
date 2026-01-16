# Comandos de Publicação de Componentes Restantes

Aqui estão os comandos para publicar cada componente restante individualmente com um intervalo de 3 minutos (180 segundos) entre eles para evitar problemas de rate limit.

## Templates

```bash

sh ./scripts/publish-component.sh --name=Radio
sleep 60

sh ./scripts/publish-component.sh --name=Rating
sleep 30

sh ./scripts/publish-component.sh --name=SegmentedControl
sleep 10

sh ./scripts/publish-component.sh --name=SiriShortcutChip
sleep 60

sh ./scripts/publish-component.sh --name=Switcher
sleep 60

sh ./scripts/publish-component.sh --name=Tabs
sleep 60

sh ./scripts/publish-component.sh --name=Timeline
sleep 60

sh ./scripts/publish-component.sh --name=Title
sleep 60
```
