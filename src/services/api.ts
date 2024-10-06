import { Child } from "../models/child";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN
const API_HOST = 'https://app.famly.co/api/'
const GROUP_ID = '86413ecf-01a1-44da-ba73-1aeda212a196'
const INSTITUTION_ID = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'

interface ChildListResponse {
  children: Array<Child>;
}

export const getChildren = async (): Promise<ChildListResponse> => {
  // TODO (LTJ): Encode URI components using native API
  const response = await fetch(`${API_HOST}daycare/tablet/group?accessToken=${ACCESS_TOKEN}&groupId=${GROUP_ID}&institutionId=${INSTITUTION_ID}`)

  if (!response.ok) {
    throw new Error(`Error fetching child list. ${response.status}`)
  }

  const responseJson = await response.json()
  return responseJson
}

export const updateChildLocation = async (childId: string, direction: 'in' | 'out') => {
	const currentTime = new Date()
	const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`
	// TODO (LTJ): Encode URI components using native API
	const response = await fetch(`${API_HOST}v2/children/${childId}/${direction === 'in' ? 'checkins' : 'checkout'}`, {
		method: 'POST',
		body: JSON.stringify({
			accessToken: import.meta.env.VITE_ACCESS_TOKEN,
			pickupTime: direction === 'in' ? formattedTime : undefined
		})
	})

	return response.ok
}