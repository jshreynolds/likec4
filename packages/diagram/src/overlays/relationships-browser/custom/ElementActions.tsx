import { IconFileSymlink, IconTransform, IconZoomScan } from '@tabler/icons-react'
import { ElementActionButtons } from '../../../base/primitives'
import type { NodeProps } from '../../../base/types'
import { useEnabledFeatures } from '../../../context/DiagramFeatures'
import { useCurrentViewId } from '../../../hooks/useCurrentViewId'
import { useDiagram } from '../../../hooks/useDiagram'
import type { RelationshipsBrowserTypes as Types } from '../_types'
import { useRelationshipsBrowser, useRelationshipsBrowserState } from '../hooks'

type ElementActionsProps = NodeProps<Types.ElementNodeData>
export const ElementActions = (props: ElementActionsProps) => {
  const { enableNavigateTo, enableVscode } = useEnabledFeatures()
  const diagram = useDiagram()
  const currentViewId = useCurrentViewId()
  const browser = useRelationshipsBrowser()
  const subject = useRelationshipsBrowserState(s => s.context.subject)

  const buttons = [] as ElementActionButtons.Item[]

  const { navigateTo, fqn } = props.data
  if (navigateTo && enableNavigateTo && currentViewId !== navigateTo) {
    buttons.push({
      key: 'navigate',
      icon: <IconZoomScan />,
      onClick: (e) => {
        e.stopPropagation()
        diagram.navigateTo(navigateTo)
      },
    })
  }
  if (fqn !== subject) {
    buttons.push({
      key: 'relationships',
      icon: <IconTransform />,
      onClick: (e) => {
        e.stopPropagation()
        browser.navigateTo(fqn, props.id)
      },
    })
  }
  if (enableVscode) {
    buttons.push({
      key: 'goToSource',
      icon: <IconFileSymlink />,
      onClick: (e) => {
        e.stopPropagation()
        diagram.openSource({ element: fqn })
      },
    })
  }
  return (
    <ElementActionButtons
      buttons={buttons}
      {...props}
    />
  )
}
