using UnityEngine;

public class StreetViewCamera:MonoBehaviour
{
	public static bool disable = false;
	public float speed = 3.5f;
	private float x;
	private float y;

	void Update() {
		if (disable)
		{
			return;
		}
		
		if (Input.GetMouseButton (0)) {
			transform.Rotate (new Vector3 (Input.GetAxis ("Mouse Y") * speed, -Input.GetAxis ("Mouse X") * speed, 0));
		}

		x = transform.rotation.eulerAngles.x;
		y = transform.rotation.eulerAngles.y;

		transform.rotation = Quaternion.Euler (x, y, 0);
	}
}
