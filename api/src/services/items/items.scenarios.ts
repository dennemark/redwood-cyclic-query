import type { Prisma, Item } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Item, 'item'>
