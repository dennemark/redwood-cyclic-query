import type { Prisma, Group } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GroupCreateArgs>({
  group: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Group, 'group'>
