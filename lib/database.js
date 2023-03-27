import clientPromise from "../lib/mongodb";

export async function all_sets() {
    const client = await clientPromise;
    const db = client.db("Quiz");
    const posts = await db.collection("Sets").find({}).sort("Priority", 1).toArray();
    return posts
}

export async function distinct_set_ids() {
    const client = await clientPromise;
    const db = client.db("Quiz");
    const path_ids = await db.collection("Sets").distinct('_id', {}, {});
    return path_ids
  }

export async function get_set(set_id) {
    const client = await clientPromise;
    const db = client.db("Quiz");
    const posts = await db.collection("Sets").find({"_id": set_id}).toArray();
    if (posts.length == 0){
        return false
    } else {
        return posts[0]
    }
}