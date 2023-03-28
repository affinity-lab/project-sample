<script lang="ts">
	export let session;
</script>

<header>
	<div class="logo">
		<div class="icon">
			<i class="bi-check-all"></i><br>
		</div>
	</div>
	<span>
		<b>Affinty Lab</b>
		<br>Tasks
	</span>
	<img class="affinity-lab" src="/affinity-lab-logo.svg" height="32">
</header>

<style lang="scss">
	header {
		.affinity-lab {
			float: right;
			margin-top: 7px;
			opacity: .7;
		}

		padding: 10px 10px;
		background-color: #0002;
		text-shadow: 0px 0px 18px #0009;

		span {
			display: inline-block;
			padding: 5px 10px;
			font-size: 11px;
			color: #fff;
			line-height: 15px;

			b {
				font-size: 13px
			}
		}

		.logo {
			display: inline-block;

			.icon {
				i {
					font-size: 32px;
				}
			}
		}
	}
</style>