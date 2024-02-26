'use server';

import { auth } from "@/auth";

const getIdsResponse = async (start: number = 0, token: string) => {
  let ids: number[] = [];
  let response = await fetch(`https://ciaochow.plusnarrative.biz/api/chows?fields[0]=id&pagination[withCount]=true&pagination[limit]=1&pagination[start]=${start}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if(!response.ok) {
    return {
      start,
      hasMore: false,
      ids
    }
  }

  let json = await response.json();

  ids = json.data.map(({ id }: { id: number }) => {
    return id;
  });

  let startNew = json.meta.pagination.start + ids.length;
  let total = json.meta.pagination.total;

  return {
    start: startNew,
    hasMore: Math.min(startNew, total) !== total,
    ids
  };
}

// Will fix types if have time.
export default async function getFoodItemIds (): Promise<any> {
  let session = await auth();
  
  if(!session?.user?.id) {
    console.log('error - user empty for some reason');
    return null;
  }

  let ids: number[] = [];

  try {
    let idsResponse = await getIdsResponse(0, session.jwt);
    let timesRun = 0;

    if(idsResponse.ids.length > 0) {
      ids = ids.concat(idsResponse.ids);
    }

    if(idsResponse.hasMore) {
      while(idsResponse.hasMore && timesRun < 20) { // While loops make me scared.
        idsResponse = await getIdsResponse(idsResponse.start, session.jwt);
        ids = ids.concat(idsResponse.ids);
        timesRun++;
      }
    }

  } catch (e) {
    console.error(e);
  }

  return ids;
};