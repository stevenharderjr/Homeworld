Database Layout:

Main document
households (array of household documents)

Household documents
members (array of memberIds)
tasks (array of taskIds)

Member documents:
availableTasks (array of taskIds)
assignedTasks (array of taskIds)
completedTasks (array of taskIds)
availableRewards (array of rewardIds)
earnedRewards (array of rewardIds)

Task documents
name
instructions
duration
reward

Reward documents:
name
description
unit
quantity

Component Structure:
