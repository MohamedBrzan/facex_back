export default async (
  publishedTrack: any[],
  reactedTrack: any[],
  user: { save: () => any },
  userId: string,
  modelToFind: { user: { toString: () => string } },
  modelId: any,
  activeAdding: boolean
): Promise<void> => {
  try {
    const inPublished = publishedTrack.findIndex(
      (p: { toString: () => any }) => p.toString() === modelId
    );

    const inReacted = reactedTrack.findIndex(
      (p: { toString: () => any }) => p.toString() === modelId
    );

    if (
      activeAdding === true &&
      inReacted < 0 &&
      inPublished < 0 &&
      modelToFind.user.toString() !== userId
    ) {
      reactedTrack.push(modelId);
    } else if (activeAdding === false && inReacted >= 0) {
      reactedTrack.splice(reactedTrack.indexOf(modelId), 1);
    }
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};
