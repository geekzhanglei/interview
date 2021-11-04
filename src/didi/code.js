/*
  1、一个页面请求数非常多，差不多有几十个接口，因为并发的原因，导致给后端的压力非常大
  	需要实现一个控制请求并发数量的方法
*/

function multiRequest(urls, max, callback) {
	// TODO
	let list = urls.slice(0, max)
	if(list.length === 0) {
		callback()
	}
	Promise.all(list).then(res => {
		multiRequest(urls.slice(max, urls.length),max, callback)
	}).catch(err => {
		// 可以再精细点，判断是哪个失败，剔除失败的再组装urls
		multiRequest(urls, max, callback)
	})
}


/*
  2、给你二叉树的根节点 root 和一个表示目标和的整数 sum，
  	判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 sum
    附图：http://img-ys011.didistatic.com/static/efe_static/do1_Mae8sHsNhY7ukJhzLD49
*/
// https://leetcode-cn.com/problems/path-sum/submissions/
// 可将这个问题转化为：是否存在从当前节点的子节点到叶子的路径，满足其路径和为sum - val，若当前节点就是叶子节点，那么直接递归的访问它的子节点是否满足条件即可
function hasPathSum(root, sum) {
    if (!root) {
        return false
    }
    if (root.left === null && root.right === null) {
        return sum === root.val
    }
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
}

