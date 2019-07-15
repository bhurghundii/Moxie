#
# https://github.com/BurgundyIsAPublicEnemy/Moxie
# Created for Python 3.7.2
#
# Reset TorCHAT and Moxie
#


from os import remove

def _file_op(op, file_paths):
	# For each file path
	for file_path in file_paths:
		status = None
		error = None
		# If the file path is a string
		if isinstance(file_path, str):
			# Remove
			if op == 'remove':
				try:
					remove(file_path)
					status = 'removed'
				except FileNotFoundError:
					error = 'file not found'
			# Create
			if op == 'create':
				open(file_path, 'a').close()
				status = 'created'
		else:
			error = 'file path is not a string'
		
		print(str.format(
			'[{:s}] {:40s} {:s}',
			# Status
			str({
				None      : 'x',
				'removed' : '-',
				'created' : '+'
			}.get(status)),
			# File Name
			str(file_path),
			# Error
			'' if error is None else '(' + str(error) + ')'
		))
			

def create_files(*file_paths):
	_file_op('create', file_paths)

def remove_files(*file_paths):
	_file_op('remove', file_paths)
			

print("""
Soft reset because we do not wanna have to come with a new tree structure again
Cleaning MOXIE'
""")

remove_files(
	"historyaddresses.txt",
	"me.info",
	"moxielogout.txt",
	"sendBuffer.txt",
	"torchat/torchat.ini",
	"torchat/buddy-list.txt",
	"torchat/Tor/tor.pid",
	"torchat/pid-torchat.txt",
	"torchat/statusUpdates.txt"
)

create_files(
	"historyaddresses.txt",
	"torchat/statusUpdates.txt"
)
