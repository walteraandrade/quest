export const gh = async (args: string[]): Promise<string> => {
  const proc = Bun.spawn(["gh", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  const code = await proc.exited
  if (code !== 0) throw new Error(`gh ${args.join(" ")} failed: ${err}`)
  return out.trim()
}

export const ghJSON = async <T>(args: string[]): Promise<T> => {
  const out = await gh(args)
  return out ? JSON.parse(out) : []
}
