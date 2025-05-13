# Asynchronous example with asyncio
import asyncio

async def read_file_async():
    await asyncio.sleep(2)    # non-blocking sleep
    return "file contents"

async def main():
    print("Before read")
    data = await read_file_async()
    print("Got data:", data)
    print("After read")

asyncio.run(main())